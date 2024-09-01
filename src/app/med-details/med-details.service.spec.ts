import { TestBed } from '@angular/core/testing';

import { MedDetailsService } from './med-details.service';

describe('MedDetailsService', () => {
  let service: MedDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
