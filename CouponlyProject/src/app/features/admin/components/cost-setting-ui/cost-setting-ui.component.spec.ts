import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSettingUIComponent } from './cost-setting-ui.component';

describe('CostSettingUIComponent', () => {
  let component: CostSettingUIComponent;
  let fixture: ComponentFixture<CostSettingUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostSettingUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostSettingUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
