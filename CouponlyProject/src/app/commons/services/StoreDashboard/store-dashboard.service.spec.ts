import { TestBed } from '@angular/core/testing';

import { StoreDashboardService } from '../store-dashboard.service';

describe('StoreDashboardService', () => {
  let service: StoreDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
