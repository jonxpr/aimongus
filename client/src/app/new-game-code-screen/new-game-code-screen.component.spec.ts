import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { NewGameCodeScreenComponent } from './new-game-code-screen.component';
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule
import { By } from '@angular/platform-browser';



describe('NewGameCodeScreenComponent', () => {
  let component: NewGameCodeScreenComponent;
  let fixture: ComponentFixture<NewGameCodeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewGameCodeScreenComponent],
      imports: [HttpClientModule, FormsModule, MatIconModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewGameCodeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Loading room code..." initially', () => {
    const divElement = fixture.debugElement.query(By.css('.code-copy-container')).nativeElement;
    expect(divElement.textContent).toContain('Loading room code...');
  });

  it('should replace "Loading room code..." with a 6 character string after generateCode is called', async () => {
    const mockCode = '123456';
    spyOn(component['gameServer'], 'generateRoomCode').and.returnValue(Promise.resolve(mockCode));  // Change 'gameServer' access modifier to public

    await component.generateCode();
    expect(component.roomCode).toBe(mockCode);
    
    fixture.detectChanges();
    const divElement = fixture.debugElement.query(By.css('.code-copy-container')).nativeElement;
    expect(divElement.textContent).toBe(' ' + mockCode + ' ');
  });

  it('should join a room with the generated game code and correct username and navigate to lobby page', () => {
    component.roomCode = '123456';
    component.username = 'bob';
    const joinRoomSpy = spyOn(component['gameServer'], 'joinRoom'); // Change 'gameServer' access modifier to public
    const navigateSpy = spyOn(component['router'], 'navigate'); // Change 'router' access modifier to public

    component.createAndJoinRoom();
    
    expect(joinRoomSpy).toHaveBeenCalledWith('123456', 'bob', 'bob');
    expect(navigateSpy).toHaveBeenCalledWith(['/123456/lobby']);

  })

  it('should navigate back to homepage', () => {
    const navigateSpy = spyOn(component['router'], 'navigate'); // Change 'router' access modifier to public

    component.backButton();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);

  })
});
