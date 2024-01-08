import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameServerService } from '../../game-server.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.sass'
})
export class LobbyComponent {
  counter: number = 0
  roomCode: string = ""

  constructor(private route: ActivatedRoute, private gameServer : GameServerService, private router: Router ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomCode = params['gameCode'];
      console.log('Game Room Code:', this.roomCode);
    });
    this.getNumberPlayersJoined()

    this.checkIfStartGameClicked()
  }

  getNumberPlayersJoined():void {
    this.gameServer.getPlayersInfoForRoom(this.roomCode).then((data) => {
      this.counter = data?.length || 0;
    }
    );
  }

  checkIfStartGameClicked():void{
    this.gameServer.receiveMessageFromServer()?.subscribe((message) => {
      console.log("message whilst in the lobby page:", message)
      if (message.content === "\"Start Game Clicked\""){
        this.startGame()
      }
    })
  }
  
  emitThatStartGameClicked():void {
    this.gameServer.sendMessageToServer("Start Game Clicked")
    console.log("start game button pressed has been informed to the server")
  }

  startGame():void{
    this.router.navigate(['/' + this.roomCode + '/chat'])
  }

  onButtonClicked():void{
    this.emitThatStartGameClicked()
    
  }

  ngOnDestory(){
    this.gameServer.receiveMessageFromServer()?.subscribe().unsubscribe()
  }







}
