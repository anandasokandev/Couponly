import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreModalComponent } from './add-store-modal.component';

describe('AddStoreModalComponent', () => {
  let component: AddStoreModalComponent;
  let fixture: ComponentFixture<AddStoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStoreModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
