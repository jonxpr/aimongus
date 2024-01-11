import { Component } from '@angular/core';
import { GameServerService } from '../../game-server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {TimeProgressSpinner} from './time-progress-spinner/time-progress-spinner.component'
import { PlayChatComponent } from './play-chat/play-chat.component';
import { CommonModule } from '@angular/common';
import { PlayVoteComponent } from './play-vote/play-vote.component';
import { PlayRevealComponent } from './play-reveal/play-reveal.component';

type State = 'Chat' | 'Vote' | 'Scoreboard';
@Component({
  standalone: true,
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrl: './play-page.component.sass',
  imports: [
    CommonModule,
    TimeProgressSpinner,
    PlayChatComponent,
    PlayVoteComponent,
    PlayRevealComponent
  ]
})
export class PlayPageComponent {
  messageToSend: string = '';
  incomingMessages: any[] = [];
  state: State = 'Chat';

  constructor(
    private gameServer: GameServerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.timer(60);
  }

  ngOnInit() {
    // FEAT: Timed phase redirect
    // Game starts at chatting phase
    // Change state to Voting Phase
    setTimeout(() => {
      this.changeStateToVote();
      
      // Change state to Reveal Phase after the first timeout finishes
      setTimeout(() => {
        this.changeStateToScoreboard();
      }, 10000);
    }, 10000);
  }

  // FEAT: Timer display
  timerValue: any; // Initialize with a default value
  timerValueProportion: any; // Initialize with a default value

  timer(seconds: number) {
    const updateTimerValues = () => {
      this.timerValue = seconds;
      this.timerValueProportion = seconds / 60;
    };

    updateTimerValues(); // Initial update

    const timer = setInterval(() => {
      seconds--;

      updateTimerValues(); // Update values on each interval

      if (seconds === 0) {
        console.log("timer finished, restarting...")
        clearInterval(timer)
        this.timer(60);
      }
    }, 1000);
  }
  // END FEAT: Timer display

  sendMessage(): void {
    console.log(this.messageToSend);
    this.gameServer.sendMessageToServer(this.messageToSend);
    this.messageToSend = '';
  }

  changeStateToChat(): void {
    this.state = 'Chat';
  }

  changeStateToVote(): void {
    this.state = 'Vote';
  }

  changeStateToScoreboard(): void {
    this.state = 'Scoreboard';
  }
}
