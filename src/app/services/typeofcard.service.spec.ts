import { TestBed } from '@angular/core/testing';

import { TypeofcardService } from './typeofcard.service';

describe('TypeofcardService', () => {
  let service: TypeofcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeofcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
