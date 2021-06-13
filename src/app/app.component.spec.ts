import { fakeAsync, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import {ServerDataService} from '../services/server-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockResponse = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientModule, ReactiveFormsModule , FormsModule, BrowserModule ],
      providers: [                   
        ServerDataService
    ]
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    mockResponse = {"servers": [{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]};
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Server-Details'`, () => {
    expect(component.title).toEqual('Server-Details');
  });

  it(`should call fetchServerData with type as true'`, fakeAsync(() => {
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(mockResponse));
    component.fetchServerData(true);
    expect(component.fetchServerData).toBeDefined();
  }));

  it(`should call fetchServerData with type as false'`, fakeAsync(() => {
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(mockResponse));
    component.fetchServerData(false);
    expect(component.fetchServerData).toBeDefined();
  }));

  it(`should call fetchServerData with empty Response'`, fakeAsync(() => {
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(''));
    component.fetchServerData(false);
    expect(component.fetchServerData).toBeDefined();
  }));

  it(`should call setRangeOptions'`, () => {
    component.filterDatas.storage = [4,5,890];
    component.setRangeOptions();
    expect(component.setRangeOptions).toBeDefined();
  });

  it(`should call onChanges'`, () => {
    component.serverForm.patchValue({
      selectedLocation: 'US',
      selectedValues: ["16"],
      storageValue: ['STAT'],
      selectedHDD: {value:0, highValue: 480}
    });
    component.onChanges();
    expect(component.onChanges).toBeDefined();
  });

  it(`should call onChanges with no Values'`, () => {
    component.serverForm.patchValue({
      selectedHDD: {}
    });
    component.onChanges();
    expect(component.onChanges).toBeDefined();
  });

  it(`should call onUserChangeEnd'`, () => {
    const changeContext: any = {value: 0 , highValue: 200};
    component.onUserChangeEnd(changeContext);
    expect(component.onUserChangeEnd).toBeDefined();
  });

  it(`should call clearFilter'`, () => {
    component.clearFilter();
    expect(component.clearFilter).toBeDefined();
  });

  it(`should call applyFilter'`, fakeAsync(() => {
    component.rangeValue = {
      value: 0 , 
      highValue: 200
    }
    component.selectedRamValue = ["16", "17"];
    component.filterDatas = {
      ramValue : ["16"],
      hddValue: 'STAT',
      location: 'AmsterDam'
    };
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(mockResponse));
    component.applyFilter();
    expect(component.applyFilter).toBeDefined();
  }));

  it(`should call applyFilter with empty Response'`, fakeAsync(() => {
    component.value = 0;
    component.maxValue = 450;
    component.rangeValue = undefined;
    component.selectedRamValue = [];
    component.selectedHDD  = '';
    component.selectedLocation = '';
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(''));
    component.applyFilter();
    expect(component.applyFilter).toBeDefined();
  }));
});
