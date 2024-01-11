import { Component } from '@angular/core';
import { GameServerService } from '../../game-server.service';
import { RevealPageComponent } from '../reveal-page/reveal-page.component';
import { QuestionsService } from '../../questions.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

type State = "Chat" | "Vote" | "Scoreboard";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass',
})
export class ChatComponent {
  messageToSend: string = "";
  incomingMessages: any[] = [];
  state: State = "Chat";
  questionFromGame: string =""

  constructor(private gameServer: GameServerService, private router: Router, private route: ActivatedRoute, private questionServer : QuestionsService) {
    this.timer(1);
  }

  ngOnInit() {
    this.gameServer.getRandomQuestion().then((question:string)=>{
      this.questionFromGame = question
    })
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      if (message.type === "Message"){
        message.content = message.content.replace(/"/g, '')
        this.incomingMessages.push(message);
      }
    })
    // FEAT: Timed phase redirect

    setTimeout(() => {
      this.router.navigate(['./vote'], { relativeTo: this.route.parent });
    }, 60000); // 60s Chatting Phase of Game
  }

  // FEAT: Timer display
  timerValue: any; // Initialize with a default value
  timerValueProportion: any; // Initialize with a default value
  
  timer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;
  
    const prefix = minute < 10 ? "0" : "";
  
    const updateTimerValues = () => {
      this.timerValue = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      this.timerValueProportion = seconds/(minute*60);
    };
  
    updateTimerValues(); // Initial update
  
    const timer = setInterval(() => {
      seconds--;
  
      if (statSec != 0) statSec--;
      else statSec = 59;
  
      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;
  
      updateTimerValues(); // Update values on each interval
  
      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }
  // END FEAT: Timer display
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
