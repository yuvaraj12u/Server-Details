import { ChangeContext } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shared-range-slider',
  templateUrl: './shared-range-slider.component.html',
  styleUrls: ['./shared-range-slider.component.scss']
})
export class SharedRangeSliderComponent implements OnChanges {
  value: number = 0;
  @Input() labelTxt: any;
  @Input() sliderOptions: any;
  @Input() maxValue: any;
  @Output() valueSelected = new EventEmitter();
  rangeValue: any;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.maxValue = changes.sliderOptions.currentValue.ceil;
  }

  /* Assigning the Filter Range Slider values */
  onUserChangeEnd(changeContext: ChangeContext) {
    this.rangeValue = changeContext;
    this.valueSelected.emit({ value: this.rangeValue });
  }

}
