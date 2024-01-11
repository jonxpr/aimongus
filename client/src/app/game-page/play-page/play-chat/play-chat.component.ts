import { Component } from '@angular/core';
import { GameServerService } from '../../../game-server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsService } from '../../../questions.service';
import { StateService } from '../../../state.service';

type State = "Chat" | "Vote" | "Scoreboard";

@Component({
  standalone: true,
  selector: 'play-chat',
  templateUrl: './play-chat.component.html',
  styleUrls: [
    '../play-page.component.sass'
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [QuestionsService]
})
export class PlayChatComponent {
  messageToSend: string = "";
  incomingMessages: any[] = [];
  state: State = "Chat";
  question: string = "";
  constructor(private gameServer: GameServerService, private router: Router, private route: ActivatedRoute, private questionServer: QuestionsService, private stateManager: StateService) {}

  ngOnInit() {
    this.gameServer.getRandomQuestion().then((question:string)=>{
      this.question = question
    })    
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      if (message.type === "Message"){
        message.content = message.content.replace(/"/g, '')
        this.incomingMessages.push(message);
      }
    })

    this.listenToPlayAgainClicked()
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

  listenToPlayAgainClicked(){
    this.stateManager.playAgainClicked.subscribe(() => {
      this.gameServer.getRandomQuestion().then((question:string)=>{
        this.question = question
      })    
    });
  }
}
