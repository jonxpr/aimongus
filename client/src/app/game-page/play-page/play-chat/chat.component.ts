import { Component } from '@angular/core';
import { GameServerService } from '../../../game-server.service';
import { RevealPageComponent } from '../../reveal-page/reveal-page.component';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

type State = "Chat" | "Vote" | "Scoreboard";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent {
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
