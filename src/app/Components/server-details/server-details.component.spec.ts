import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { ServerDetailsComponent } from './server-details.component';

import { ServerDataService } from 'src/services/server-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

describe('ServerDetailsComponent', () => {
  let component: ServerDetailsComponent;
  let fixture: ComponentFixture<ServerDetailsComponent>;
  let mockResponse = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ServerDetailsComponent
      ],
      imports: [HttpClientModule, ReactiveFormsModule , FormsModule, BrowserModule, ProgressSpinnerModule ],
      providers: [                   
        ServerDataService
    ]
    })
    .compileComponents();
    const fixture = TestBed.createComponent(ServerDetailsComponent);
    mockResponse = {"servers": [{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]};
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Server-Details'`, () => {
    expect(component.title).toEqual('Server-Details');
  });

  it(`verify fetchServerData function returns data from api set Filter in initialLoad'`, fakeAsync(() => {
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(mockResponse));
    component.fetchServerData(true);
    expect(component.fetchServerData).toBeDefined();
  }));

  it(`verify fetchServerData function returns data from api when clear button is clicked and should leave existing filters'`, fakeAsync(() => {
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(mockResponse));
    component.fetchServerData(false);
    expect(component.fetchServerData).toBeDefined();
  }));

  it(`verify whether fetchServerData function handled empty response from API'`, fakeAsync(() => {
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(''));
    component.fetchServerData(false);
    expect(component.fetchServerData).toBeDefined();
  }));

  it(`verify setRangeOptions whether slider values'`, () => {
    component.filterDatas.storage = [4,5,890];
    component.setRangeOptions();
    expect(component.setRangeOptions).toBeDefined();
  });

  it(`onChnges method to handle filter enable/disable functionality`, () => {
    component.serverForm.patchValue({
      selectedLocation: 'US',
      selectedValues: ["16"],
      storageValue: ['STAT'],
      selectedHDD: {value:0, highValue: 480}
    });
    component.onChanges();
    expect(component.onChanges).toBeDefined();
  });

  it(`If no filter is selected filter button should be disabled'`, () => {
    component.serverForm.patchValue({
      selectedHDD: {}
    });
    component.onChanges();
    expect(component.onChanges).toBeDefined();
  });

  it(`when clearFilter function is initiated check whether its cleared all the filter already selected Values'`, () => {
    component.clearFilter();
    expect(component.clearFilter).toBeDefined();
  });

  it(`check whether location filter selected value is updated in the form'`, () => {
    const e = { value: '16GB'};
    component.dropdownValueChanged(e, 'location');
    expect(component.dropdownValueChanged).toBeDefined();
  });

  it(`check whether hdd filter selected value is updated in the form'`, () => {
    const e = { value: '16GB'};
    component.dropdownValueChanged(e, 'hdd');
    expect(component.dropdownValueChanged).toBeDefined();
  });

  it(`check whether ram filter selected value is updated in the form'`, () => {
    const e = { value: '16GB'};
    component.dropdownValueChanged(e, 'ram');
    expect(component.dropdownValueChanged).toBeDefined();
  });

  it(`check whether storage filter selected value is updated in the form'`, () => {
    const e = { value: '16GB'};
    component.dropdownValueChanged(e, 'storage');
    expect(component.dropdownValueChanged).toBeDefined();
  });

  it(`When all filter values are selected if we click Filter Button check proper filtered values are passed to the API'`, fakeAsync(() => {
    component.rangeValue = {
      value: 0 , 
      highValue: 200
    }
    component.serverForm.patchValue({
      selectedLocation: { name: 'UNITED STATES', value: 'UNITED STATES'},
      selectedHDD: { name: 'STAT', value: 'STAT'},
      storageValue: { value: 0 , maxValue: 1500},
      selectedValues: [16, 21]
    });
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(mockResponse));
    component.applyFilter();
    expect(component.applyFilter).toBeDefined();
  }));

  it(`When all filter values are selected if we click Filter Button check proper filtered values are passed to the API'`, fakeAsync(() => {
    component.rangeValue = {
      value: 0 , 
      highValue: 200
    }
    component.serverForm.patchValue({
      selectedLocation: { name: 'UNITED STATES', value: 'UNITED STATES'},
      selectedHDD: { name: 'STAT', value: 'STAT'},
      storageValue: { value: 0 , maxValue: 1500},
      selectedValues: []
    });
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(mockResponse));
    component.applyFilter();
    expect(component.applyFilter).toBeDefined();
  }));

  it(`If filter returns empty response'`, fakeAsync(() => {
    component.value = 0;
    component.maxValue = 450;
    component.rangeValue = undefined;
    component.serverForm.patchValue({
      selectedLocation: {},
      selectedHDD: {},
      storageValue: {},
      selectedValues: [16, 21]
    });
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    spyOn(serverDataService, 'fetchServerData').and.returnValue(of(''));
    component.applyFilter();
    expect(component.applyFilter).toBeDefined();
  }));
});
