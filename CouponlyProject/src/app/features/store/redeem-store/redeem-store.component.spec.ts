import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemStoreComponent } from './redeem-store.component';

describe('RedeemStoreComponent', () => {
  let component: RedeemStoreComponent;
  let fixture: ComponentFixture<RedeemStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
