import { TestBed } from '@angular/core/testing';

import { CostSettingService } from './cost-setting.service';

describe('CostSettingService', () => {
  let service: CostSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
