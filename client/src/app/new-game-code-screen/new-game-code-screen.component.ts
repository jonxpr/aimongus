import { Component } from '@angular/core';
import { GameServerService } from '../game-server.service';

interface roomData {
  id: string;
  name: string;
}


@Component({
  selector: 'app-new-game-code-screen',
  templateUrl: './new-game-code-screen.component.html',
  styleUrl: './new-game-code-screen.component.sass'
})
export class NewGameCodeScreenComponent {
  roomCode: string | undefined;
  username: string = " "


  constructor(private gameServer : GameServerService) {}

  ngOnInit(): void {
    this.generateCode();
  }

  generateCode(): void{
    this.gameServer.generateRoomCode().then((code:string) => {
      this.roomCode = code;
      console.log("code generated",code)
    })
  }

  createAndJoinRoom():void{
    if(typeof this.roomCode === "string"){
      const roomData : roomData = {
        id: this.roomCode,
        name: this.roomCode
    };
    const roomDataJson = JSON.stringify(roomData);
    this.gameServer.createRoom(roomDataJson)
    console.log("new room created",roomDataJson)
    this.gameServer.joinRoom(roomData.id,this.username,this.username)
    console.log("player has joined room")

    } else{
      console.error("roomCode not generated/ is undefined");
    }

  }

  

}
