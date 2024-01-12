package ws

import (
	"fmt"
	"net/http"

	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"

	"strconv"
)

type Handler struct {
	hub *Hub
}

func NewHandler(h *Hub) *Handler {
	return &Handler{
		hub: h,
	}
}

type CreateRoomReq struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (h *Handler) CreateRoom(c *gin.Context) {
	var req CreateRoomReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	h.hub.Rooms[req.ID] = &Room{
		ID:       req.ID,
		Name:     req.Name,
		Clients:  make(map[string]*Client),
		AiName:   "Nathan",
		Question: h.GetRandomStartingQuestion(),
	}

	c.JSON(http.StatusOK, req)
}

func (h *Handler) CreateRoomCode(c *gin.Context) {
	const potential_values = "abcdefghijklmnopqrstuvwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ0123456789"
	rand.Seed(time.Now().UnixNano())

	code := make([]byte, 6)
	for i := range code {
		code[i] = potential_values[rand.Intn(len(potential_values))]
	}

	c.JSON(http.StatusOK, string(code))

}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *Handler) JoinRoom(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	roomID := c.Param("roomId")
	clientID := c.Query("userId")
	username := c.Query("username")
	NumRoom := h.GetNumberOfClientsInRoom(roomID)

	cl := &Client{
		Conn:             conn,
		Message:          make(chan *Message, 10),
		ID:               clientID,
		RoomID:           roomID,
		Username:         username,
		Score:            0,
		Votes:            0,
		NumPlayersFooled: 0,
		NumCorrectGuess:  0,
	}

	n := &Message{
		Type:     "NumInRoomData",
		Content:  "Number:" + NumRoom,
		RoomID:   roomID,
		Username: username,
	}

	h.hub.Register <- cl
	h.hub.Broadcast <- n

	go cl.writeMessage()
	cl.readMessage(h.hub)
}

type RoomRes struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (h *Handler) GetRooms(c *gin.Context) {
	rooms := make([]RoomRes, 0)

	for _, r := range h.hub.Rooms {
		rooms = append(rooms, RoomRes{
			ID:   r.ID,
			Name: r.Name,
		})
	}

	c.JSON(http.StatusOK, rooms)
}

type ClientRes struct {
	ID       string `json:"id"`
	Username string `json:"username"`
}

func (h *Handler) GetClients(c *gin.Context) {
	var clients []ClientRes
	roomId := c.Param("roomId")

	if _, ok := h.hub.Rooms[roomId]; !ok {
		clients = make([]ClientRes, 0)
		fmt.Println("room doesn't exist")
		c.JSON(http.StatusOK, "room doesn't exist")
	}

	for _, c := range h.hub.Rooms[roomId].Clients {
		clients = append(clients, ClientRes{
			ID:       c.ID,
			Username: c.Username,
		})
	}
	fmt.Println(clients, "adasdas")
	c.JSON(http.StatusOK, clients)
}

// username and userid are both set to the same value in the clientside because I am lazy
type IncrementVoteReq struct {
	RoomId      string `json:"roomId"`
	VoterId     string `json:"voterId"`
	VotedUserId string `json:"voteduserId"`
}

func (h *Handler) IncrementPlayerVote(c *gin.Context) {
	var req IncrementVoteReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if room, ok := h.hub.Rooms[req.RoomId]; ok {
		if req.VotedUserId == room.AiName {
			if client, ok := room.Clients[req.VoterId]; ok {
				client.NumCorrectGuess++
				c.JSON(http.StatusOK, "guessed AI correctly, incremented value for player")
			} else {
				c.JSON(http.StatusBadRequest, "Client ID is not found")
			}
		} else if client, ok := room.Clients[req.VotedUserId]; ok {
			client.NumPlayersFooled++
			client.Votes++
			c.JSON(http.StatusOK, "fooled one person, incremented value for player")
		} else {
			c.JSON(http.StatusBadRequest, "Client ID is not found")
		}
	} else {
		c.JSON(http.StatusBadRequest, "room ID is not found")
	}
}

type ResetVoteReq struct {
	RoomId string `json:"roomId"`
}

func (h *Handler) ResetPlayerVote(c *gin.Context) {
	var req ResetVoteReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if room, ok := h.hub.Rooms[req.RoomId]; ok {
		for _, client := range room.Clients {
			client.Votes = 0
		}
		c.JSON(http.StatusOK, "")
	} else {
		c.JSON(http.StatusBadRequest, "room ID is not found")
	}
}

type UpdateVoteReq struct {
	RoomId string `json:"roomId"`
	UserId string `json:"userId"`
}

// below is redundant, not needed anymore
func (h *Handler) UpdatePlayerScoreBasedOnVote(c *gin.Context) {
	var req UpdateVoteReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if player x fools others in thinking that x is the AI, then people would vote for x and x would get points.
	if room, ok := h.hub.Rooms[req.RoomId]; ok {
		if client, ok := room.Clients[req.UserId]; ok {
			client.Score += client.Votes
			// this resets the votes to 0 once the score is updated
			client.Votes = 0
			c.JSON(http.StatusOK, client.Votes)
		} else {
			c.JSON(http.StatusBadRequest, "Client ID is not found")
		}
	} else {
		c.JSON(http.StatusBadRequest, "room ID is not found")
	}
}

// below used for testing purposes
func (h *Handler) GetPlayerScore(c *gin.Context) {
	roomID := c.Param("roomId")
	clientID := c.Query("userId")

	if room, roomExists := h.hub.Rooms[roomID]; roomExists {
		if client, clientExists := room.Clients[clientID]; clientExists {
			score := client.Score
			c.JSON(http.StatusOK, score)
			return
		} else {
			c.JSON(http.StatusBadRequest, "Client does not exist in room")
		}
	} else {
		c.JSON(http.StatusBadRequest, "Room does not exist")
	}
}

// below used for testing purposes
func (h *Handler) GetPlayerVote(c *gin.Context) {
	roomID := c.Param("roomId")
	clientID := c.Query("userId")

	if room, roomExists := h.hub.Rooms[roomID]; roomExists {
		if client, clientExists := room.Clients[clientID]; clientExists {
			votes := client.Votes
			c.JSON(http.StatusOK, votes)
			return
		} else {
			c.JSON(http.StatusOK, "Client does not exist in room")
		}
	} else {
		c.JSON(http.StatusOK, "Room does not exist")
	}
}

func (h *Handler) SetNewQuestion(c *gin.Context) {
	var req ResetVoteReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if room, ok := h.hub.Rooms[req.RoomId]; ok {
		room.Question = h.GetRandomStartingQuestion()
	} else {
		c.JSON(http.StatusBadRequest, "room ID is not found")
	}
}

func (h *Handler) GetNumberOfClientsInRoom(roomID string) string {
	if _, ok := h.hub.Rooms[roomID]; !ok {
		return "Room doesn't exist"
	}
	return strconv.Itoa(len(h.hub.Rooms[roomID].Clients))
}

func (h *Handler) GetRandomStartingQuestion() string {
	rand.Seed(time.Now().UnixNano())

	questionBank := []string{
		"If you were a vegetable, what vegetable would you be and why?",
		"What is your spirit animal?",
		"If you could have dinner with any fictional character, who would it be?",
		"What's the weirdest food combination you enjoy?",
		"If aliens visited Earth, what dish would you want to introduce them to?",
		"If you could swap lives with any person for a day, who would it be?",
		"What's the most embarrassing thing that's ever happened to you?",
		"If you could have any mythical creature as a pet, what would it be?",
		"What's the silliest joke you know?",
		"If you had a theme song that played whenever you entered a room, what would it be?",
		"If you could create a new holiday, what would it celebrate?",
		"What's your favorite dance move, and can you demonstrate it (virtually)?",
		"If you were a wizard, what would your signature spell do?",
		"What's the strangest talent you possess?",
		"If you were a superhero with a sidekick, what would their name be?",
		"What's your favorite dad joke?",
		"If you could have any fictional technology from a movie or book, what would it be?",
		"What's the most unusual pet you would consider having?",
		"If you could visit any fictional world, where would you go?",
		"What's your go-to karaoke song?",
		"If you had a magic wand, what's the first thing you would do with it?",
		"What's your spirit emoji?",
		"If you could be any inanimate object for a day, what would it be and why?",
		"What's the weirdest dream you've ever had?",
		"If your life had a tagline, what would it be?",
		"If you could switch lives with a cartoon character, who would it be?",
		"What's your favorite type of cheese?",
		"If you were a superhero, what would be your weakness?",
		"What's the most ridiculous thing you believed as a child?",
		"If you could time travel only once, would you go to the past or the future?",
		"What's the craziest thing on your bucket list?",
		"If you were a dessert, what dessert would you be?",
		"What's the most absurd item on your bucket list?",
	}

	randomIndex := rand.Intn(len(questionBank))
	randomQuestion := questionBank[randomIndex]
	return randomQuestion
}
