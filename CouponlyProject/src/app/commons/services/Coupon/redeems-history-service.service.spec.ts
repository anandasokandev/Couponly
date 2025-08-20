import { TestBed } from '@angular/core/testing';
import { RedeemsHistoryServiceService } from './redeems-history-service.service';

describe('RedeemsHistoryServiceService', () => {
  let service: RedeemsHistoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedeemsHistoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
