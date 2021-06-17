import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import appConstant from 'src/app/constants/appconstant';

@Component({
  selector: 'app-server-grid',
  templateUrl: './server-grid.component.html',
  styleUrls: ['./server-grid.component.scss']
})
export class ServerGridComponent implements OnInit {

  @Input() serverData: any;
  localConstant = appConstant;
  cols:any[] = [];
  
  constructor() { }

  ngOnInit(): void {
    /* Setting Columns to Table */
    this.cols = [
      { field: 'model', header: 'Model' },
      { field: 'ram', header: 'RAM' },
      { field: 'hdd', header: 'HDD' },
      { field: 'location', header: 'LOCATION' },
      { field: 'price', header: 'PRICE' }
    ];
  }

}
