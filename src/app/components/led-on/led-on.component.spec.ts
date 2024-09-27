import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedOnComponent } from './led-on.component';

describe('LedOnComponent', () => {
  let component: LedOnComponent;
  let fixture: ComponentFixture<LedOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LedOnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
