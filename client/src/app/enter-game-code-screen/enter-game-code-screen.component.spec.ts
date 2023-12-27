import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterGameCodeScreenComponent } from './enter-game-code-screen.component';

describe('EnterGameCodeScreenComponent', () => {
  let component: EnterGameCodeScreenComponent;
  let fixture: ComponentFixture<EnterGameCodeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnterGameCodeScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterGameCodeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
