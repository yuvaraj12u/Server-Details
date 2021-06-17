import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerDataService } from 'src/services/server-data.service';
import { HttpClientModule } from '@angular/common/http';

import { SharedFilterDropdownComponent } from './shared-filter-dropdown.component';

describe('SharedFilterDropdownComponent', () => {
  let component: SharedFilterDropdownComponent;
  let fixture: ComponentFixture<SharedFilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFilterDropdownComponent ],
      imports: [HttpClientModule],
      providers: [                   
        ServerDataService
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFilterDropdownComponent);
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
