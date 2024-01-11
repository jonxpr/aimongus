import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { LobbyComponent } from './lobby.component';
import { GameServerService } from '../../game-server.service';



describe('LobbyComponent', () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;

  beforeEach(async () => {
    const mockMessage = {
      type: 'NumInRoomData',
      content: 'number:5', 
    };

    await TestBed.configureTestingModule({
      declarations: [LobbyComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({gameCode:'testGameCode'}),
          },
        },
        {
          provide: GameServerService,
          useValue: {
            // Mock methods or properties used by the component
            receiveMessageFromServer: jasmine.createSpy().and.returnValue(of(mockMessage)),
            sendMessageToServer: jasmine.createSpy(),
          },
        },
        {
          provide: Router,
          useValue: {
            // Mock methods or properties used by the component
            navigate: jasmine.createSpy(),
          },
        },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //tests for ngOnInit
  it('should update room code from route params', () => {
    expect(component.roomCode).toBe('testGameCode');
  });

  it('should call getNumberPlayersJoined and checkIfStartGameClicked in ngOnInit', () => {
    expect(component.gameServer.receiveMessageFromServer).toHaveBeenCalled();
  });

  //tests for getNumberPlayersJoined

  it('should increase counter on recieving NumInRoomData message', () => {
    component.getNumberPlayersJoined();

    expect(component.counter).toBe(6);
  });

  //tests for checkIfStartGameClicked

  // it('should start game on recieving message content', () => {
  //   const mockMessage2 = {
  //     type : 'test',
  //     content : '\"Start Game Clicked\"'
  //   };

  //   // Configure GameServerService to return the updated mock message
  //   TestBed.overrideProvider(GameServerService, { 
  //     useValue: { 
  //       receiveMessageFromServer: jasmine.createSpy().and.returnValue(of(mockMessage2)), 
  //       sendMessageToServer: jasmine.createSpy() 
  //     } 
  //   });

  //   component.checkIfStartGameClicked();

  //   expect(spyOn(component, 'startGame')).toHaveBeenCalled();

  // });
  



  

  
  
});
