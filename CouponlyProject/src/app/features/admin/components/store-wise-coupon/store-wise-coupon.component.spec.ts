import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWiseCouponComponent } from './store-wise-coupon.component';

describe('StoreWiseCouponComponent', () => {
  let component: StoreWiseCouponComponent;
  let fixture: ComponentFixture<StoreWiseCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreWiseCouponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreWiseCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
