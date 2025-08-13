import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadRedeemsModelComponent } from './download-redeems-model.component';

describe('DownloadRedeemsModelComponent', () => {
  let component: DownloadRedeemsModelComponent;
  let fixture: ComponentFixture<DownloadRedeemsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadRedeemsModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadRedeemsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
