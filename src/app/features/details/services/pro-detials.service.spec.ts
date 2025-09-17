import { TestBed } from '@angular/core/testing';

import { ProDetialsService } from './pro-detials.service';

describe('ProDetialsService', () => {
  let service: ProDetialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProDetialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
