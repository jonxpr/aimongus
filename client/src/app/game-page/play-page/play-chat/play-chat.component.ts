import { Component } from '@angular/core';
import { GameServerService } from '../../../game-server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

type State = "Chat" | "Vote" | "Scoreboard";

@Component({
  standalone: true,
  selector: 'play-chat',
  templateUrl: './play-chat.component.html',
  styleUrls: [
    '../play-page.component.sass'
  ],
  imports: [
    CommonModule
  ]
})
export class PlayChatComponent {
  messageToSend: string = "";
  incomingMessages: any[] = [];
  state: State = "Chat";

  constructor(private gameServer: GameServerService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      if (message.type === "Message"){
        message.content = message.content.replace(/"/g, '')
        this.incomingMessages.push(message);
      }
    })
  }

  sendMessage(): void {
    console.log(this.messageToSend);
    this.gameServer.sendMessageToServer(this.messageToSend);
    this.messageToSend = "";
  }

  changeStateToChat():void{
    this.state = "Chat"
  }

  changeStateToVote():void{
    this.state = "Vote"
  }
  
  changeStateToScoreboard():void{
    this.state = "Scoreboard"
  }
}
