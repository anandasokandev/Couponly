import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationModalComponent } from './edit-location-modal.component';

describe('EditLocationModalComponent', () => {
  let component: EditLocationModalComponent;
  let fixture: ComponentFixture<EditLocationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLocationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
