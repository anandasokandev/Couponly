import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponModalComponentComponent } from './add-coupon-modal-component.component';

describe('AddCouponModalComponentComponent', () => {
  let component: AddCouponModalComponentComponent;
  let fixture: ComponentFixture<AddCouponModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCouponModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCouponModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
