import { Component } from '@angular/core';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@Component({
  standalone: true,
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.sass',
  imports: [
    ScoreboardComponent
  ]
})
export class GamePageComponent {

}
