import { Component } from '@angular/core';
import { VotingButtons } from './voting-buttons/voting-buttons.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'play-vote',
  standalone: true,
  imports: [
    VotingButtons,
    MatCardModule,
  ],
  templateUrl: './play-vote.component.html',
  styleUrl: '../play-page.component.sass'
})
export class PlayVoteComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.timer(1);
  }

  ngOnInit() {
    // FEAT: Timed phase redirect

    //setTimeout(() => {
      //this.router.navigate(['./reveal'], { relativeTo: this.route.parent });
    //}, 60000); // 60s Voting Phase of Game
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
}