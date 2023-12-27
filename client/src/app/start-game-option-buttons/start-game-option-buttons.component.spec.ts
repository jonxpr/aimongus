import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameOptionButtonsComponent } from './start-game-option-buttons.component';

describe('StartGameOptionButtonsComponent', () => {
  let component: StartGameOptionButtonsComponent;
  let fixture: ComponentFixture<StartGameOptionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartGameOptionButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartGameOptionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
