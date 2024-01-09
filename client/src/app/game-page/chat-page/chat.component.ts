import { Component } from '@angular/core';
import { GameServerService } from '../../game-server.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass'
})
export class ChatComponent {
  messageToSend : string = ""
  incomingMessages: any[] = []

  constructor(private gameServer:GameServerService){}

  ngOnInit(){
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      message.content = message.content.replace(/"/g, '')
      this.incomingMessages.push(message);
    })
  }

  sendMessage(): void{
    console.log(this.messageToSend);
    this.gameServer.sendMessageToServer(this.messageToSend);
    this.messageToSend = "";
  }

}
