import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindStoreModelComponent } from './find-store-model.component';

describe('FindStoreModelComponent', () => {
  let component: FindStoreModelComponent;
  let fixture: ComponentFixture<FindStoreModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindStoreModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindStoreModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
