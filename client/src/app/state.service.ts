import { Injectable, Output, EventEmitter } from '@angular/core';


type State = "Chat" | "Vote" | "Scoreboard"

@Injectable({
  providedIn: 'root'
})
export class StateService {
  state:State = "Chat"
  @Output() playAgainClicked = new EventEmitter<void>();


  constructor() { }
  changeStateToChat(): void {
    console.log("State changed to chat")
    this.state = 'Chat';
  }

  changeStateToVote(): void {
    console.log("State changed to vote")
    this.state = 'Vote';
  }

  changeStateToScoreboard(): void {
    console.log("State changed to Scoreboard")
    this.state = 'Scoreboard';
  }

  emitPlayAgainEmitted(){
    this.playAgainClicked.emit()
  }
}
