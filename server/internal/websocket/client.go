package ws

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn             *websocket.Conn
	Message          chan *Message
	ID               string `json:"id"`
	RoomID           string `json:"roomId"`
	Username         string `json:"username"`
	Score            int    `json:"score"`
	Votes            int    `json:"votes"`
	NumPlayersFooled int    `json:"numplayersfooled"`
	NumCorrectGuess  int    `json:"numcorrectguess"`
}

type Message struct {
	Type     string `json:"type"`
	Content  string `json:"content"`
	RoomID   string `json:"roomId"`
	Username string `json:"username"`
}

type ScoreData struct {
	Username         string `json:"username"`
	TotalScore       int    `json:"totalscore"`
	NumPlayersFooled int    `json:"numplayersfooled"`
	NumCorrectGuess  int    `json:"numcorrectguess"`
}

func (c *Client) writeMessage() {
	defer func() {
		c.Conn.Close()
	}()

	for {
		message, ok := <-c.Message
		if !ok {
			return
		}

		c.Conn.WriteJSON(message)
	}
}

func (c *Client) readMessage(hub *Hub) {
	defer func() {
		hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, m, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		if string(m) == `"getVotes"` {
			fmt.Println("getVotes triggered")
			votes := make(map[string]int)
			for _, client := range hub.Rooms[c.RoomID].Clients {
				votes[client.Username] = client.Votes
			}

			votesJSON, err := json.Marshal(votes)
			if err != nil {
				fmt.Println("Error in coverting votes map to an JSON")
			}

			sendVoteData := &Message{
				Type:     "VoteData",
				Content:  string(votesJSON),
				RoomID:   c.RoomID,
				Username: "Server",
			}
			hub.Broadcast <- sendVoteData

		} else if string(m) == `"getQuestion"` {

			room := hub.Rooms[c.RoomID]

			sendQuestion := &Message{
				Type:     "StarterQuestion",
				Content:  room.Question,
				RoomID:   c.RoomID,
				Username: "Server",
			}

			hub.Broadcast <- sendQuestion

		} else if string(m) == `"getScores"` {
			scores := make([]ScoreData, 0)
			for _, client := range hub.Rooms[c.RoomID].Clients {
				scoreData := ScoreData{
					Username:         client.Username,
					TotalScore:       client.NumCorrectGuess + client.NumPlayersFooled,
					NumPlayersFooled: client.NumPlayersFooled,
					NumCorrectGuess:  client.NumCorrectGuess,
				}
				scores = append(scores, scoreData)
			}

			scoresJSON, err := json.Marshal(scores)
			if err != nil {
				fmt.Println("Error in coverting scores map to an JSON")
			}

			sendScoreData := &Message{
				Type:     "ScoreData",
				Content:  string(scoresJSON),
				RoomID:   c.RoomID,
				Username: "Server",
			}
			hub.Broadcast <- sendScoreData

		} else {

			msg := &Message{
				Type:     "Message",
				Content:  string(m),
				RoomID:   c.RoomID,
				Username: c.Username,
			}

			hub.Broadcast <- msg

		}
	}
}
