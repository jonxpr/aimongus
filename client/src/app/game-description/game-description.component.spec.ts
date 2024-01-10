import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDescriptionComponent } from './game-description.component';

describe('GameDescriptionComponent', () => {
  let component: GameDescriptionComponent;
  let fixture: ComponentFixture<GameDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display game description', () => {
    const h3Element = fixture.nativeElement.querySelector('h3');
    expect(h3Element.textContent).toContain('Welcome player, In this game you have a conversation with other contestants. However, Someone in your group is an AI imposter... Can you guess who it is?');
  })
});
