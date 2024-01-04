import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameServerService } from '../game-server.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.sass'
})
export class LobbyComponent {
  counter: number = 0
  roomCode: string = ""

  constructor(private route: ActivatedRoute, private gameServer : GameServerService ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomCode = params['gameCode'];
      console.log('Game Room Code:', this.roomCode);
    });
    this.getNumberPlayersJoined()
  }

  getNumberPlayersJoined():void {
    this.gameServer.getPlayersInfoForRoom(this.roomCode).then((data) => {
      this.counter = data?.length || 0;
    }
    );
  }




}
