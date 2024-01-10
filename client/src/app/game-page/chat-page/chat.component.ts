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

  constructor(public gameServer:GameServerService){}

  ngOnInit(){
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      this.incomingMessages.push(message);
    })
  }

  sendMessage(): void{
    this.gameServer.sendMessageToServer(this.messageToSend);
    this.messageToSend = "";
  }

}
