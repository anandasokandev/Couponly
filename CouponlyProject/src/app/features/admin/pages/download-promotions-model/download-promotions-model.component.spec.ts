import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPromotionsModelComponent } from './download-promotions-model.component';

describe('DownloadPromotionsModelComponent', () => {
  let component: DownloadPromotionsModelComponent;
  let fixture: ComponentFixture<DownloadPromotionsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadPromotionsModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadPromotionsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
