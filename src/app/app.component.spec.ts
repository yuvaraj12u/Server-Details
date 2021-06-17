import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ServerDataService} from '../services/server-data.service';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [                   
        ServerDataService
    ]
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  
});
