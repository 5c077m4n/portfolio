import { TestBed } from '@angular/core/testing';

import { PorfolioService } from './porfolio.service';

describe('PorfolioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PorfolioService = TestBed.get(PorfolioService);
    expect(service).toBeTruthy();
  });
});
