import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GameServerService } from '../../game-server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {TimeProgressSpinner} from './time-progress-spinner/time-progress-spinner.component'
import { PlayChatComponent } from './play-chat/play-chat.component';
import { CommonModule } from '@angular/common';
import { PlayVoteComponent } from './play-vote/play-vote.component';
import { PlayRevealComponent } from './play-reveal/play-reveal.component';
import { VotingButtons } from './play-vote/voting-buttons/voting-buttons.component';
import { StateService } from '../../state.service';

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
    PlayRevealComponent,
    VotingButtons
  ]
})
export class PlayPageComponent implements AfterViewInit {
  @ViewChild(VotingButtons) votingButtons!: VotingButtons;
  messageToSend: string = '';
  incomingMessages: any[] = [];
  state: State = this.stateManager.state

  constructor(
    private gameServer: GameServerService,
    private router: Router,
    private route: ActivatedRoute,
    private stateManager:StateService
  ) {
    this.timer(60);
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.listenToPlayAgainClicked()
    // FEAT: Timed phase redirect
    // Game starts at chatting phase
    // Change state to Voting Phase
    setTimeout(() => {
      this.stateManager.changeStateToVote();
      this.udpateState()
      
      // Change state to Reveal Phase after the first timeout finishes
      setTimeout(() => {
        // this.votingButtons.sendVote(); done within voting buttons now
        this.stateManager.changeStateToScoreboard();
        this.udpateState()
      }, 60000);
    }, 60000);
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

  udpateState():void{
    this.state = this.stateManager.state
  }

  listenToPlayAgainClicked(){
    this.stateManager.playAgainClicked.subscribe(() => {
      this.state = this.stateManager.state
    });

  }
}
