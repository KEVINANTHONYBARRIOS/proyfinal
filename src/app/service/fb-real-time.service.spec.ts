import { TestBed } from '@angular/core/testing';

import { FbRealTimeService } from './fb-real-time.service';

describe('FbRealTimeService', () => {
  let service: FbRealTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbRealTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
