import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerGridComponent } from './server-grid.component';

describe('ServerGridComponent', () => {
  let component: ServerGridComponent;
  let fixture: ComponentFixture<ServerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
