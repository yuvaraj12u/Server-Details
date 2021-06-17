import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServerDataService } from 'src/services/server-data.service';

@Component({
  selector: 'app-shared-filter-dropdown',
  templateUrl: './shared-filter-dropdown.component.html',
  styleUrls: ['./shared-filter-dropdown.component.scss']
})
export class SharedFilterDropdownComponent {

  @Input() dropdownLabel: any;
  @Input() optionsData: any;
  @Input() placeHolderName: any;
  selectedLocation: any = {};
  @Output() valueSelected = new EventEmitter();

  constructor(public serverDataService: ServerDataService) {
    this.serverDataService.clearFilters.subscribe((value: any) => {
      if (value) {
        this.selectedLocation = {};
      }
    });
  }


  dropdownValueChanged() {
    this.valueSelected.emit({ value: this.selectedLocation });
  }
}
