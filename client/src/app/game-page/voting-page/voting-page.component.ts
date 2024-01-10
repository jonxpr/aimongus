import { Component } from '@angular/core';
import { RadioNgModelExample } from './radio-ng-model-example/radio-ng-model-example.component';
import { ProgressSpinnerConfigurableExample } from './progress-spinner-configurable-example/progress-spinner-configurable-example.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voting-page',
  standalone: true,
  imports: [
    RadioNgModelExample,
    ProgressSpinnerConfigurableExample,
    MatCardModule,
  ],
  templateUrl: './voting-page.component.html',
  styleUrl: './voting-page.component.sass'
})
export class VotingPageComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.timer(1);
  }

  ngOnInit() {
    // FEAT: Timed phase redirect

    setTimeout(() => {
      this.router.navigate(['./reveal'], { relativeTo: this.route.parent });
    }, 60000); // 60s Voting Phase of Game
  }

  // FEAT: Timer display
  timerValue: any; // Initialize with a default value
  timerValueSeconds: any; // Initialize with a default value
  
  timer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;
  
    const prefix = minute < 10 ? "0" : "";
  
    const updateTimerValues = () => {
      this.timerValue = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      this.timerValueSeconds = seconds;
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