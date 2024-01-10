import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { of } from 'rxjs';


import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports:[HttpClientModule, FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a message and reset messageToSend', () => {
    // Arrange
    component.messageToSend = 'Test Message';
    const sendMessageToServerSpy = spyOn(component.gameServer, 'sendMessageToServer');
  
    // Act
    
    component.sendMessage();
  
    // Assert
    expect(sendMessageToServerSpy).toHaveBeenCalledWith('Test Message');
    expect(component.messageToSend).toEqual('');
  });
  
  it('should subscribe to recieveMessageFromServer and update incomingMessages', () => {
    
    const mockMessage = {username: 'Aisha', content: 'hello'}
    const recieveMessageFromServer = spyOn(component.gameServer, 'receiveMessageFromServer').and.returnValue(of(mockMessage));

    component.ngOnInit();

    expect(recieveMessageFromServer).toHaveBeenCalled();
  });

  it('should display username and content', () => {
    component.incomingMessages = [{username: 'User', content: 'Hello!'}];

    fixture.detectChanges();

    const messageElements = fixture.nativeElement.querySelectorAll('.message')
    expect(messageElements.length).toBe(1);
    expect(messageElements[0].querySelector('.username').textContent).toContain('User');
    expect(messageElements[0].querySelector('.content').textContent).toContain('Hello');
  })

  it('it should change the state when needed', () => {
    component.state = 'Chat';

    component.changeState();

    expect(component.state).toEqual('Vote');
  })
});
