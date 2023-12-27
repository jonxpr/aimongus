import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameCodeScreenComponent } from './new-game-code-screen.component';

describe('NewGameCodeScreenComponent', () => {
  let component: NewGameCodeScreenComponent;
  let fixture: ComponentFixture<NewGameCodeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewGameCodeScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewGameCodeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
