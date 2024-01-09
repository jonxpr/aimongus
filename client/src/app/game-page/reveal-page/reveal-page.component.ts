import { Component } from '@angular/core';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-reveal-page',
  templateUrl: './reveal-page.component.html',
  styleUrl: './reveal-page.component.sass',
  imports: [ScoreboardComponent]
})
export class RevealPageComponent {
  susPlayer: any;

  constructor(private router: Router) {}
  onReturnToHomeButtonClicked() {
      this.router.navigate(['/'])
  }

}
