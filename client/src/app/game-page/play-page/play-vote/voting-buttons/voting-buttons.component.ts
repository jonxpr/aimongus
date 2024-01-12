import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { GameServerService } from '../../../../game-server.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface voteData{
  roomId : string
  voterId : string
  voteduserId: string
}

interface VoteResult {
  [key: string]: number;
}

type State = "Vote" | "Results"

/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'voting-buttons',
  templateUrl: 'voting-buttons.component.html',
  styleUrl: 'voting-buttons.component.sass',
  standalone: true,
  imports: [MatRadioModule, FormsModule, CommonModule],
})
export class VotingButtons {
  susPlayer: string | undefined;
  players: string[] = [];
  roomCode: string = ""
  voteResult: VoteResult = {}
  state : State = "Vote"
  username: string = this.gameServer.username

  constructor(private gameServer: GameServerService, private route: ActivatedRoute){}

  ngOnInit(): void {
    setTimeout(() => {
      this.sendVote();
    }, 59000);
    const gameCodeFromURL = this.route.parent?.snapshot.paramMap.get('gameCode');
    this.roomCode = typeof gameCodeFromURL === 'string' ? gameCodeFromURL : "";
    this.username = this.gameServer.username.replace(/\s+/g, '')
    console.log(this.username)
    this.getPlayerNames()
    console.log(this.players)
  }

  async getPlayerNames(): Promise<void> {
    let clients_list = await this.gameServer.getPlayersInfoForRoom(this.roomCode);
    console.log(this.roomCode, clients_list)
    for (let client of clients_list) {
      this.players.push(client.username.replace(/\s+/g, ''));
    }
  }

  sendVote():void{
    if (typeof this.susPlayer === "string"){
      const voteData : voteData = {
        roomId: this.roomCode,
        voterId: this.gameServer.username,
        voteduserId: this.susPlayer
      }
      const voteDataJSON = JSON.stringify(voteData)
      this.gameServer.sendVote(voteDataJSON)
    }
  }

  getVoteResult():void{
    this.gameServer.sendMessageToServer("getVotes")
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      if (message.type === "VoteData"){
        this.voteResult = JSON.parse(message.content)
      }
    })  
  }

  seeResults():void{
    this.state = "Results"
    this.getVoteResult()
  }

  getVoteResultNames(){
    {
      return Object.keys(this.voteResult);
    }
  }

  

}
