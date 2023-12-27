import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.sass'
})
export class HomepageComponent {
  showGameDescriptionAndButton = true;
  showNewGameOptions = false;
  showEnterGameCode = false;
  showNewGameCode = false;


  onPlayClicked() {
    console.log('Play button clicked!');

    this.showGameDescriptionAndButton = false;
    this.showNewGameOptions = true;
  }

  onEnterGameCodeClicked(){
    this.showEnterGameCode = true;
    this.showNewGameOptions = false;
  }

  onStartNewGameClicked(){
    this.showNewGameCode = true;
    this.showNewGameOptions = false

  }

}
