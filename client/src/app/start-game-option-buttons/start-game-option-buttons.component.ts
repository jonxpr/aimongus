import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start-game-option-buttons',
  templateUrl: './start-game-option-buttons.component.html',
  styleUrl: './start-game-option-buttons.component.sass'
})
export class StartGameOptionButtonsComponent {
  @Output() enterGameCodeClicked = new EventEmitter<void>();

  onEnterGameCodeClicked() {
    console.log('Join game with code clicked!');
    this.enterGameCodeClicked.emit();
  }
}
