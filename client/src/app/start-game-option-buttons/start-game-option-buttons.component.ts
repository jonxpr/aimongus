import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-game-option-buttons',
  templateUrl: './start-game-option-buttons.component.html',
  styleUrl: './start-game-option-buttons.component.sass'
})
export class StartGameOptionButtonsComponent {
  constructor(private router: Router) {}


  onEnterGameCodeClicked() {
    console.log('Join game with code clicked!');
    this.router.navigate(['/enter-code'])
  }

  onNewGameClicked() {
    console.log('Start New Game button clicked!');
    this.router.navigate(['/new-game-code'])

  }

}
