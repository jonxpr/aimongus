import { Component } from '@angular/core';
import { GameServerService } from '../../game-server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

type State = "Chat" | "Vote";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent {
  messageToSend: string = "";
  incomingMessages: any[] = [];
  state: State = "Chat";

  constructor(private gameServer: GameServerService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      if (message.type === "Message") {
        message.content = message.content.replace(/"/g, '');
        this.incomingMessages.push(message);
      }
    });

    // TIMER 

    setTimeout(() => {
      this.router.navigate(['./vote'], { relativeTo: this.route.parent });
    }, 60000); // 60s Chatting Phase of Game
  }

  sendMessage(): void {
    console.log(this.messageToSend);
    this.gameServer.sendMessageToServer(this.messageToSend);
    this.messageToSend = "";
  }

  changeState(): void {
    if (this.state === "Chat") {
      this.state = "Vote";
    } else {
      this.state = "Chat";
    }
  }
}
