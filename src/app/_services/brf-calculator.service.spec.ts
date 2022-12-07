import { TestBed } from '@angular/core/testing';

import { BrfCalculatorService } from './brf-calculator.service';

describe('BrfCalculatorService', () => {
  let service: BrfCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrfCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
