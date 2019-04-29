import { TestBed } from '@angular/core/testing';

import { ThanosSnapService } from './thanos-snap.service';

describe('ThanosSnapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThanosSnapService = TestBed.get(ThanosSnapService);
    expect(service).toBeTruthy();
  });
});
