import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServerDataService } from 'src/services/server-data.service';

@Component({
  selector: 'app-shared-filter-checkbox',
  templateUrl: './shared-filter-checkbox.component.html',
  styleUrls: ['./shared-filter-checkbox.component.scss']
})
export class SharedFilterCheckboxComponent {
  
  @Input() dropdownLabel: any;
  @Input() ramData: any;
  @Output() valueSelected = new EventEmitter();
  selectedRamValue: any = [];
  
  constructor(public serverDataService: ServerDataService) {
    this.serverDataService.clearFilters.subscribe((value: any) => {
      if (value) {
        this.selectedRamValue = [];
      }
    });
   }

   dropdownValueChanged() {
    this.valueSelected.emit({value: this.selectedRamValue});
  }

}
