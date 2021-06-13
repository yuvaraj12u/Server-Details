import { fakeAsync, TestBed } from '@angular/core/testing';

import { ServerDataService } from './server-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ServerDataService', () => {
  let service: ServerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ServerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', fakeAsync(() => {
    const httpService: HttpClient = TestBed.get(HttpClient);
    service.fetchServerData('', true);
    expect(service.fetchServerData).toBeDefined();
  }));

  it('should be created', fakeAsync(() => {
    const Data = {
      ramValue: 16,
      rangeOptions: {value: 0 , highValue : 458},
      hddValue: 'STAT',
      location: 'UNITED STATES'
    }
    const httpService: HttpClient = TestBed.get(HttpClient);
    service.fetchServerData(Data, false);
    expect(service.fetchServerData).toBeDefined();
  }));
});
