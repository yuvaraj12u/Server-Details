import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { ChangeContext, LabelType } from '@angular-slider/ngx-slider';
import { ServerDataService } from 'src/services/server-data.service';
import appConstant from 'src/app/constants/appconstant';

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.scss']
})
export class ServerDetailsComponent implements OnInit {

  title = 'Server-Details';
  serverDetails: any = [];
  filterDatas: any = {
    location: [],
    ram: [],
    hdd: [],
    storage: []
  }
  showLoader = false;
  showFilterOptions = false;
  rangeOptions: any = {};
  rangeValue: any;
  localConstant = appConstant;

  value: number = 0;
  maxValue: any = '';

  serverForm = this.fb.group({
    selectedLocation: new FormControl(''),
    selectedHDD: new FormControl(''),
    selectedValues: new FormControl(''),
    storageValue: new FormControl(''),
  });
  disableFilterBtn = true;

  constructor(public serverDataService: ServerDataService, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchServerData(true);
    this.onChanges();
  }
  /* Fetching the Server Details */
  fetchServerData(type: any) {
    this.showLoader = true;
    this.serverDataService.fetchServerData('', true).subscribe(value => {
      this.showLoader = false;
      if (value.servers && value.servers.length > 0) {
        this.serverDetails = value.servers;
        if (type) {
          /* Setting the Filter Options */
          this.filterDatas.location = this.setFilterDatas(value.servers, this.filterDatas.location, 'location') ? this.setDropdownData(this.filterDatas.location, 'location', 'dropdown') : [];
          this.filterDatas.ram = this.setFilterDatas(value.servers, this.filterDatas.ram, 'ram') ? this.removeDuplicatesFromArr(this.setDropdownData(this.filterDatas.ram, 'ram', 'checkbox'), 'name') : [];
          this.filterDatas.hdd = this.setFilterDatas(value.servers, this.filterDatas.hdd, 'hdd') ? this.removeDuplicatesFromArr(this.setDropdownData(this.filterDatas.hdd, 'hdd', 'dropdown'), 'name') : [];
          this.filterDatas.storage = this.setFilterDatas(value.servers, this.filterDatas.storage, 'hdd') ? this.removeDuplicatesFromArr(this.setDropdownData(this.filterDatas.storage, 'hdd', 'slider'), '') : [];
          this.setRangeOptions();
          this.showFilterOptions = true;
        } else {
          this.setRangeOptions();
        }
      }
    });
  }
/* Setting the filtered Values in the Form */
  dropdownValueChanged(e: any, type: any) {
    if (type === 'location') {
      this.serverForm.controls['selectedLocation'].setValue(e.value);
    } else if (type === 'hdd') {
      this.serverForm.controls['selectedHDD'].setValue(e.value);
    } else if (type === 'ram') {
      this.serverForm.controls['selectedValues'].setValue(e.value);
    } else {
      this.serverForm.controls['storageValue'].setValue(e.value);
    }
    this.onChanges();
  }

  /* Setting the Filter Range Slider */
  setRangeOptions() {
    if (this.filterDatas.storage && this.filterDatas.storage.length > 0) {
      this.rangeOptions = {
        floor: 0,
        ceil: this.filterDatas.storage.reduce(function (a: any, b: any) {
          return Math.max(a, b);
        }),
        translate: (value: number, label: LabelType): string => {
          return value + ' TB';
        },
        step: 800,
        showTicks: true,
      }
      this.value = 0;
      this.maxValue = this.rangeOptions.ceil;
    }
  }

  /* Clearing the Filter Values and reset to default */
  clearFilter() {
    this.serverForm.patchValue({
      selectedLocation: {},
      selectedHDD: {},
      selectedValues: [],
      storageValue: {},
    });
    this.serverDataService.clearFilters.next(true);
    this.disableFilterBtn = true;
    this.fetchServerData(false);
  }
  /* Enabling Filter Button if all filters are selected */
  onChanges() {
    if (Object.keys(this.serverForm.value.selectedHDD).length > 0 && this.serverForm.value.selectedValues.length > 0 && Object.keys(this.serverForm.value.selectedLocation).length > 0 && Object.keys(this.serverForm.value.storageValue).length > 0) {
      this.disableFilterBtn = false;
    }
  }
  /* From Response assigning the corresponding filter options */
  setFilterDatas(serverData: any, arr: any, type: any) {
    serverData.forEach((data: any) => {
      if (arr.indexOf(data[type]) === -1) {
        arr.push(data[type]);
      }
    });
    return arr;
  }
  /* Setting the Dropdown as per primeng p-dropdown */
  setDropdownData(finalArr: any, storageType: any, type: any) {
    const finalData: any = [];
    let arrFormat: any;
    finalArr.forEach((value: any) => {
      if (type === 'dropdown') {
        arrFormat = {
          name: (storageType === 'hdd') ? value.type : value,
          code: (storageType === 'hdd') ? value.type : value,
        };
      } else if (type === 'slider') {
        arrFormat = `${(value.memory * value.count)}`;
      } else {
        arrFormat = {
          name: `${value.memory + value.unit}`,
          key: value.memory
        };
      }
      finalData.push(arrFormat);
    });
    return finalData;
  }
  /* Remvoing duplications values from array */
  removeDuplicatesFromArr(arr: any, type: any) {
    let uniqueArray: any;
    if (type) {
      uniqueArray = arr.filter((value: any, index: any, loclaArr: any) => loclaArr.findIndex((filterVal: any) => (filterVal[type] === value[type])) === index);
    } else {
      uniqueArray = arr.filter((value: any, index: any) => arr.indexOf(value) == index);
    }
    return uniqueArray;
  }
  /* Applying Filter when clicking 'Filter' button */
  applyFilter() {
    const verifyStorage = {
      value: this.value,
      highValue: this.maxValue
    };

    const requestInput = {
      ramValue: this.setRamQueryParam(),
      hddValue: (Object.keys(this.serverForm.value.selectedHDD).length > 0) ? this.serverForm.value.selectedHDD.name : [],
      location: (Object.keys(this.serverForm.value.selectedLocation).length > 0) ? this.serverForm.value.selectedLocation.name : [],
      rangeOptions: (Object.keys(this.serverForm.value.storageValue).length > 0) ? this.serverForm.value.storageValue : verifyStorage
    };
    this.showLoader = true;
    this.serverDataService.fetchServerData(requestInput, false).subscribe(value => {
      this.showLoader = false;
      this.serverDetails = [];
      if (value.servers && value.servers.length > 0) {
        this.serverDetails = value.servers;
      }
    });
  }
  /* Creating Ram values as string to pass it in the queryparam */
  setRamQueryParam() {
    const ramArray: any = [];
    if (this.serverForm.value.selectedValues && this.serverForm.value.selectedValues.length > 0) {
      this.serverForm.value.selectedValues.forEach((value: any) => {
        ramArray.push(value.key);
      });
    }
    return ramArray.toString();
  }

}
