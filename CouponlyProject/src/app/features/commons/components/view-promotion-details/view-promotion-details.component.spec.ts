import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromotionDetailsComponent } from './view-promotion-details.component';

describe('ViewPromotionDetailsComponent', () => {
  let component: ViewPromotionDetailsComponent;
  let fixture: ComponentFixture<ViewPromotionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPromotionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPromotionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
