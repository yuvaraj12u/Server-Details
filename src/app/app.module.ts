import { NgModule } from '@angular/core';
import { ServerDataService } from 'src/services/server-data.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ServerDetailsComponent } from './Components/server-details/server-details.component';
import { ServerGridComponent } from './Components/CommonComponents/server-grid/server-grid.component';
import { SharedRangeSliderComponent } from './Components/CommonComponents/shared-range-slider/shared-range-slider.component';
import { SharedFilterDropdownComponent } from './Components/CommonComponents/shared-filter-dropdown/shared-filter-dropdown.component';
import { SharedFilterCheckboxComponent } from './Components/CommonComponents/shared-filter-checkbox/shared-filter-checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerDetailsComponent,
    ServerGridComponent,
    SharedRangeSliderComponent,
    SharedFilterDropdownComponent,
    SharedFilterCheckboxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    CheckboxModule,
    ReactiveFormsModule,
    ButtonModule,
    ProgressSpinnerModule,
    NgxSliderModule
  ],
  providers: [ServerDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
