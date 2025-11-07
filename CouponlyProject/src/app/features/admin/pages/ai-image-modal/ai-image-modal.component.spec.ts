import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiImageModalComponent } from './ai-image-modal.component';

describe('AiImageModalComponent', () => {
  let component: AiImageModalComponent;
  let fixture: ComponentFixture<AiImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiImageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
