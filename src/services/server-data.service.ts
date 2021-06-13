import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  constructor(public httpService: HttpClient) { }

  fetchServerData(data: any, type: any):  Observable<any> {
    const url = 'http://95.211.111.66:4300/api/servers';
    if (type) {
      return this.httpService.get(url);
    } else {
      return this.httpService.get(url + '?ram=' + data.ramValue + '&storageMin=' + data.rangeOptions.value + '&storageMax=' + data.rangeOptions.highValue + '&hdd=' + data.hddValue + '&location=' + data.location);
    }    
  }
}
