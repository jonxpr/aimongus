package main

import (
	"log"
	//"../internal/websocket"
    "github.com/jonxpr/aimongus/server/internal/websocket"
)

func main() {
	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)
	go hub.Run()

	router.InitRouter(userHandler, wsHandler)
	router.Start("0.0.0.0:8080")
}