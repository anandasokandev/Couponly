import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportContactModalComponent } from './export-contact-modal.component';

describe('ExportContactModalComponent', () => {
  let component: ExportContactModalComponent;
  let fixture: ComponentFixture<ExportContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportContactModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
