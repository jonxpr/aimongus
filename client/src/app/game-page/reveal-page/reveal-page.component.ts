import { Component } from '@angular/core';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';

@Component({
  standalone: true,
  selector: 'app-reveal-page',
  templateUrl: './reveal-page.component.html',
  styleUrl: './reveal-page.component.sass',
  imports: [ScoreboardComponent]
})
export class RevealPageComponent {
susPlayer: any;
onReturnToHomeButtonClicked() {
throw new Error('Method not implemented.');
}

}
