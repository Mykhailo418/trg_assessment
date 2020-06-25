import { TestBed } from '@angular/core/testing';

import { LocationsStorageService } from './locations-storage.service';

describe('LocationsStorageService', () => {
  let service: LocationsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
