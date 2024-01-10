import { Component } from '@angular/core';
import { GameServerService } from '../../game-server.service';
type State = "Chat" | "Vote"
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass'
})
export class ChatComponent {
  messageToSend : string = ""
  incomingMessages: any[] = []
  state: State = "Chat"

  constructor(public gameServer:GameServerService){}

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

  changeState():void{
    if (this.state === "Chat"){
      this.state = "Vote"
    }else{
      this.state = "Chat"
    }
  }

}
