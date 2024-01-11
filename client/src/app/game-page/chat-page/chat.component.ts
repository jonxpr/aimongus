import { Component } from '@angular/core';
import { GameServerService } from '../../game-server.service';
import { RevealPageComponent } from '../reveal-page/reveal-page.component';

type State = "Chat" | "Vote" | "Scoreboard"
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass',
})
export class ChatComponent {
  messageToSend : string = ""
  incomingMessages: any[] = []
  state: State = "Chat"

  constructor(private gameServer:GameServerService){}

  ngOnInit(){
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      if (message.type === "Message"){
        message.content = message.content.replace(/"/g, '')
        this.incomingMessages.push(message);
      }
    })
  }

  sendMessage(): void{
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
