import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindemoComponent } from './logindemo.component';

describe('LogindemoComponent', () => {
  let component: LogindemoComponent;
  let fixture: ComponentFixture<LogindemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogindemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogindemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
