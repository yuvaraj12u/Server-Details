import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRangeSliderComponent } from './shared-range-slider.component';

describe('SharedRangeSliderComponent', () => {
  let component: SharedRangeSliderComponent;
  let fixture: ComponentFixture<SharedRangeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedRangeSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call onUserChangeEnd'`, () => {
    const changeContext: any = {value: 0 , highValue: 200};
    component.onUserChangeEnd(changeContext);
    expect(component.onUserChangeEnd).toBeDefined();
  });
});
