import { Component, Output, EventEmitter } from '@angular/core';
import { ScoreboardComponent } from '../../scoreboard/scoreboard.component';
import { Router } from '@angular/router';
import { StateService } from '../../../state.service';

@Component({
  standalone: true,
  selector: 'play-reveal',
  templateUrl: './play-reveal.component.html',
  styleUrl: './play-reveal.component.sass',
  imports: [ScoreboardComponent]
})
export class PlayRevealComponent {
  susPlayer: any;
  state = this.stateManager.state
  @Output() playAgainClicked = new EventEmitter<void>();

  constructor(private router: Router, private stateManager:StateService) {}
  onReturnToHomeButtonClicked() {
      this.router.navigate(['/'])
  }

  onPlayAgainClicked():void{
    this.stateManager.changeStateToChat()
    this.stateManager.emitPlayAgainEmitted()
  }

}
