import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { GameServerService } from '../../../game-server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';



interface voteData{
  roomId : string
  userId: string
}

interface VoteResult {
  [key: string]: number;
}

type State = "Vote" | "Results"

/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'radio-ng-model-example',
  templateUrl: 'radio-ng-model-example.component.html',
  styleUrls: ['radio-ng-model-example.component.sass'],
  standalone: true,
  imports: [MatRadioModule, FormsModule, CommonModule],
})
export class RadioNgModelExample {
  susPlayer: string | undefined;
  players: string[] = [];
  roomCode: string = ""
  voteResult: VoteResult = {}
  state : State = "Vote"

  constructor(private gameServer: GameServerService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomCode = params['gameCode'];
    });
    this.getPlayerNames()
  }

  async getPlayerNames(): Promise<void> {
    let clients_list = await this.gameServer.getPlayersInfoForRoom(this.roomCode);
    console.log(this.roomCode, clients_list)
    for (let client of clients_list) {
      this.players.push(client.username);
    }
  }

  sendVote():void{
    if (typeof this.susPlayer === "string"){
      const voteData : voteData = {
        roomId: this.roomCode,
        userId: this.susPlayer
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
