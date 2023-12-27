import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.sass'
})
export class PlayButtonComponent {
  @Output() playClicked = new EventEmitter<void>();

  onPlayClick() {
    console.log('Play button clicked!');
    this.playClicked.emit();
  }

}
