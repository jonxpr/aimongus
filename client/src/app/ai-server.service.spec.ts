import { TestBed } from '@angular/core/testing';

import { AiServerService } from './ai-server.service';

describe('AiServerService', () => {
  let service: AiServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
