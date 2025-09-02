import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCalculatorModelComponent } from './promotion-calculator-model.component';

describe('PromotionCalculatorModelComponent', () => {
  let component: PromotionCalculatorModelComponent;
  let fixture: ComponentFixture<PromotionCalculatorModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionCalculatorModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionCalculatorModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
