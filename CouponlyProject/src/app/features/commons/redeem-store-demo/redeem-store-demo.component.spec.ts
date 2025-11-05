import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemStoreDemoComponent } from './redeem-store-demo.component';

describe('RedeemStoreDemoComponent', () => {
  let component: RedeemStoreDemoComponent;
  let fixture: ComponentFixture<RedeemStoreDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemStoreDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemStoreDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
