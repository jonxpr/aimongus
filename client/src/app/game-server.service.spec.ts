import { TestBed } from '@angular/core/testing';

import { GameServerService } from './game-server.service';

describe('GameServerService', () => {
  let service: GameServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
