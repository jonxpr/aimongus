import { Component } from '@angular/core';
import { GameServerService } from '../game-server.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enter-game-code-screen',
  templateUrl: './enter-game-code-screen.component.html',
  styleUrl: './enter-game-code-screen.component.sass'
})
export class EnterGameCodeScreenComponent {
  gameCode: string = ""
  username: string = ""

  constructor(private gameServer : GameServerService, private router: Router){}


  joinRoom(){
    this.gameServer.joinRoom(this.gameCode,this.username,this.username)
    console.log("player has joined room")
    this.router.navigate(['/' + this.gameCode + '/lobby'])
  }
}
