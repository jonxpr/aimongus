package ws

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn     *websocket.Conn
	Message  chan *Message
	ID       string `json:"id"`
	RoomID   string `json:"roomId"`
	Username string `json:"username"`
	Score    int    `json:"score"`
	Votes    int    `json:"votes"`
}

type Message struct {
	Type     string `json:"type"`
	Content  string `json:"content"`
	RoomID   string `json:"roomId"`
	Username string `json:"username"`
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

		if string(m) == "getVotes" {
			votes := make(map[string]int)
			for _, client := range hub.Rooms[c.RoomID].Clients {
				votes[client.Username] = client.Votes
			}

			votesJSON, err := json.Marshal(votes)
			if err != nil {
				fmt.Println("Error in coverting votes map to an array")
			}

			sendVoteData := &Message{
				Type:     "VoteData",
				Content:  string(votesJSON),
				RoomID:   c.RoomID,
				Username: "Server",
			}
			hub.Broadcast <- sendVoteData

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
