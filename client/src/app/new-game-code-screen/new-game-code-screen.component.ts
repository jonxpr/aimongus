import { Component } from '@angular/core';
import { GameServerService } from '../game-server.service';

@Component({
  selector: 'app-new-game-code-screen',
  templateUrl: './new-game-code-screen.component.html',
  styleUrl: './new-game-code-screen.component.sass'
})
export class NewGameCodeScreenComponent {
  roomCode: string | undefined;

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

}
