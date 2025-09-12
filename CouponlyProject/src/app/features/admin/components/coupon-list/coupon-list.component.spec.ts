import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponlistComponent } from './coupon-list.component';

describe('CouponListComponent', () => {
  let component: CouponlistComponent;
  let fixture: ComponentFixture<CouponlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
