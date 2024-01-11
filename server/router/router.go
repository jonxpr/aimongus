package router

import (
	"time"

	ws "github.com/jonxpr/aimongus/server/internal/websocket"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func InitRouter(wsHandler *ws.Handler) {
	r = gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4200"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:4200"
		},
		MaxAge: 12 * time.Hour,
	}))

	r.POST("/ws/createRoom", wsHandler.CreateRoom)
	r.GET("/ws/joinRoom/:roomId", wsHandler.JoinRoom)
	r.GET("/ws/getRooms", wsHandler.GetRooms)
	r.GET("/ws/getClients/:roomId", wsHandler.GetClients)
	r.GET("/ws/createRoomCode", wsHandler.CreateRoomCode)
	r.POST("/ws/incrementVote", wsHandler.IncrementPlayerVote)
	r.GET("/ws/getPlayerVote/:roomId", wsHandler.GetPlayerVote)
	r.GET("/ws/getPlayerScore/:roomId", wsHandler.GetPlayerScore)
	r.POST("ws/updatePlayerScore", wsHandler.UpdatePlayerScoreBasedOnVote)
	r.POST("ws/resetVote", wsHandler.ResetPlayerVote)
}

func Start(addr string) error {
	return r.Run(addr)
}
