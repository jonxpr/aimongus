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
		ID:      req.ID,
		Name:    req.Name,
		Clients: make(map[string]*Client),
		AiName:  "AI",
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

func (h *Handler) GetNumberOfClientsInRoom(roomID string) string {
	if _, ok := h.hub.Rooms[roomID]; !ok {
		return "Room doesn't exist"
	}
	return strconv.Itoa(len(h.hub.Rooms[roomID].Clients))
}
