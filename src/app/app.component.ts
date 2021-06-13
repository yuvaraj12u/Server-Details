import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {ServerDataService} from '../services/server-data.service';
import { FormControl, FormBuilder } from '@angular/forms';
import {  ChangeContext } from '@angular-slider/ngx-slider';
import appConstant from './constants/appconstant';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Server-Details';
  cols:any[];
  serverDetails: any = [];
  filterDatas: any = {
    location: [],
    ram: [],
    hdd: [],
    storage: []
  }
  selectedRamValue: any = [];
  selectedLocation: any = {};
  selectedHDD: any = {};
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
    this.cols = [];
  }

  ngOnInit() {  
    /* Setting Columns to Table */  
    this.cols = [
      { field: 'model', header: 'Model' },
      { field: 'ram', header: 'RAM' },
      { field: 'hdd', header: 'HDD' },
      { field: 'location', header: 'LOCATION' },
      { field: 'price', header: 'PRICE' }
    ];
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
/* Setting the Filter Range Slider */
  setRangeOptions() {
    if (this.filterDatas.storage && this.filterDatas.storage.length > 0) {
      this.rangeOptions = {
        floor: 0,
        ceil: this.filterDatas.storage.reduce(function(a: any, b: any) {
          return Math.max(a, b);
        }),
        step: 600,
        showTicks: true,
      }
      this.value = 0;
      this.maxValue = this.rangeOptions.ceil;
    }
  }
/* Assigning the Filter Range Slider values */
  onUserChangeEnd(changeContext: ChangeContext) {
    this.rangeValue = changeContext;
  }

  /* Clearing the Filter Values and reset to default */
  clearFilter() {
    this.selectedRamValue = [];
    this.selectedLocation = '';
    this.selectedHDD = '';
    this.disableFilterBtn = true;    
    this.fetchServerData(false);
  }
/* Enabling Filter Button if all filters are selected */
  onChanges() {
    this.serverForm.valueChanges.subscribe((selectedValue) => {
        if (Object.keys(selectedValue.selectedHDD).length > 0 && selectedValue.selectedValues.length > 0 && Object.keys(selectedValue.selectedLocation).length > 0 && selectedValue.storageValue.length > 0) {
          this.disableFilterBtn = false;
        }
    });
  }
/* From Response assigning the corresponding filter options */
  setFilterDatas(serverData: any, arr: any, type: any) {
    serverData.forEach((data: any) => {
        if(arr.indexOf(data[type]) === -1) {
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
      if(type === 'dropdown') {
        arrFormat = {
          name: (storageType === 'hdd') ? value.type : value, 
          code: (storageType === 'hdd') ? value.type : value,
        }; 
      } else if(type === 'slider') {
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
      uniqueArray = arr.filter((value: any,index: any,loclaArr: any)=> loclaArr.findIndex((filterVal: any)=>(filterVal[type] === value[type]))===index);
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
      ramValue : this.setRamQueryParam(),
      hddValue: this.selectedHDD ?  this.selectedHDD.name : [],
      location: this.selectedLocation ?  this.selectedLocation.name : [],
      rangeOptions: this.rangeValue ? this.rangeValue : verifyStorage
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
    const ramArray:any = [];
    if(this.selectedRamValue && this.selectedRamValue.length > 0) {
      this.selectedRamValue.forEach((value: any) => {
        ramArray.push(value.key);
      });
    }
    return ramArray.toString();
  }
}
