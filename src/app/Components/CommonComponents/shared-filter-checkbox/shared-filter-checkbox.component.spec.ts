import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFilterCheckboxComponent } from './shared-filter-checkbox.component';
import { ServerDataService } from 'src/services/server-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('SharedFilterCheckboxComponent', () => {
  let component: SharedFilterCheckboxComponent;
  let fixture: ComponentFixture<SharedFilterCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFilterCheckboxComponent ],
      imports: [HttpClientModule],
      providers: [                   
        ServerDataService
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFilterCheckboxComponent);
    component = fixture.componentInstance;
    const serverDataService: ServerDataService = TestBed.get(ServerDataService);
    serverDataService.clearFilters.next(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if location Dropdown filter value changed emit to parent server-details component', () => {
    component.dropdownValueChanged();
    expect(component.dropdownValueChanged).toBeDefined();
  });
});
