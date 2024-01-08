import { Component } from '@angular/core';
import {Sort, MatSortModule} from '@angular/material/sort';

export interface Player {
  playerName: string;
  playerTotalScore: number;
  playerAisGuessed: number;
  playerPlayersFooled: number;
}

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.sass',
  standalone: true,
  imports: [MatSortModule],
})
export class ScoreboardComponent {
  players: Player[] = [
    {playerName: 'Frozen yogurt', playerTotalScore: 159, playerAisGuessed: 6, playerPlayersFooled: 24},
    {playerName: 'Ice cream sandwich', playerTotalScore: 237, playerAisGuessed: 9, playerPlayersFooled: 37},
    {playerName: 'Eclair', playerTotalScore: 262, playerAisGuessed: 16, playerPlayersFooled: 24},
    {playerName: 'Cupcake', playerTotalScore: 305, playerAisGuessed: 4, playerPlayersFooled: 67},
    {playerName: 'Gingerbread', playerTotalScore: 356, playerAisGuessed: 16, playerPlayersFooled: 49},
  ];

  sortedData: Player[];

  constructor() {
    this.sortedData = this.players.slice();
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
        case 'playerName':
          return compare(a.playerName, b.playerName, isAsc);
        case 'playerTotalScore':
          return compare(a.playerTotalScore, b.playerTotalScore, isAsc);
        case 'playerAisGuessed':
          return compare(a.playerAisGuessed, b.playerAisGuessed, isAsc);
        case 'playerPlayersFooled':
          return compare(a.playerPlayersFooled, b.playerPlayersFooled, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}