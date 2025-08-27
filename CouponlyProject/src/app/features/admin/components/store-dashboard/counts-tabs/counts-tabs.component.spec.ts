import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountsTabsComponent } from './counts-tabs.component';

describe('CountsTabsComponent', () => {
  let component: CountsTabsComponent;
  let fixture: ComponentFixture<CountsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountsTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
