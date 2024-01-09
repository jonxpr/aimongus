import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { GameServerService } from '../../../game-server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'radio-ng-model-example',
  templateUrl: 'radio-ng-model-example.component.html',
  styleUrls: ['radio-ng-model-example.component.sass'],
  standalone: true,
  imports: [MatRadioModule, FormsModule],
})
export class RadioNgModelExample {
  susPlayer: string | undefined;
  players: string[] = [];
  roomCode: string = ""

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
  
}
