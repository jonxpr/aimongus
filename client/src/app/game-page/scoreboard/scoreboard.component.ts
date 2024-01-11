import { Component } from '@angular/core';
import {Sort, MatSortModule} from '@angular/material/sort';
import { GameServerService } from '../../game-server.service';
import { CommonModule } from '@angular/common';


export interface Player {
  Username: string;
  TotalScore: number;
  NumPlayersFooled: number;
  NumCorrectGuess: number;
}

interface RoomData {
  roomId: string
}
@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.sass',
  standalone: true,
  imports: [MatSortModule, CommonModule],
})
export class ScoreboardComponent {
  players: any[] = [];
  sortedData: Player[];

  constructor(private gameServer: GameServerService) {
    this.sortedData = this.players.slice();
  }

  ngOnInit():void{
    this.getScoreResult()
    this.resetVotes()
  }

  sortData(sort: Sort) {
    const data = this.players.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Username':
          return compare(a.Username, b.Username, isAsc);
        case 'TotalScore':
          return compare(a.TotalScore, b.TotalScore, isAsc);
        case 'NumCorrectGuess':
          return compare(a.NumCorrectGuess, b.NumCorrectGuess, isAsc);
        case 'NumPlayersFooled':
          return compare(a.NumPlayersFooled, b.NumPlayersFooled, isAsc);
        default:
          return 0;
      }
    });
  }

  getScoreResult():void{
    this.gameServer.sendMessageToServer("getScores")
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      if (message.type === "ScoreData"){
        this.players = JSON.parse(message.content)
        console.log("getscores result",JSON.parse(message.content))
      }
    })  
  }
  

  resetVotes():void{
    const roomData :RoomData = {
      roomId : this.gameServer.roomCode
    }
    console.log(this.gameServer.roomCode)
    let roomDataJSON = JSON.stringify(roomData)
    this.gameServer.resetVoteCounter(roomDataJSON)
  }

}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}