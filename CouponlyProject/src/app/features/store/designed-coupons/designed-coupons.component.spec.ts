import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignedCouponsComponent } from './designed-coupons.component';

describe('DesignedCouponsComponent', () => {
  let component: DesignedCouponsComponent;
  let fixture: ComponentFixture<DesignedCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignedCouponsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignedCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
