import { Component } from '@angular/core';
import { ScoreboardComponent } from '../../scoreboard/scoreboard.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'play-reveal',
  templateUrl: './play-reveal.component.html',
  styleUrl: '../play-page.component.sass',
  imports: [ScoreboardComponent]
})
export class PlayRevealComponent {
  susPlayer: any;

  constructor(private router: Router) {}
  onReturnToHomeButtonClicked() {
      this.router.navigate(['/'])
  }

}
