import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { EnterGameCodeScreenComponent } from './enter-game-code-screen.component';



describe('EnterGameCodeScreenComponent', () => {
  let component: EnterGameCodeScreenComponent;
  let fixture: ComponentFixture<EnterGameCodeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnterGameCodeScreenComponent],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterGameCodeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should join a room with the correct game code and username and navigate to lobby page', () => {
    component.gameCode = 'Test12';
    component.username = 'Aisha';
    const joinRoomSpy = spyOn(component.gameServer, 'joinRoom');
    const navigateSpy = spyOn(component.router, 'navigate')

    component.joinRoom();
    
    expect(joinRoomSpy).toHaveBeenCalledWith('Test12', 'Aisha', 'Aisha');
    expect(navigateSpy).toHaveBeenCalledWith(['/Test12/lobby']);

  })

  it('should navigate back to homepage', () => {
    const navigateSpy = spyOn(component.router, 'navigate');

    component.backButton();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);

  })
});
