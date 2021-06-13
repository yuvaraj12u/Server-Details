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

@NgModule({
  declarations: [
    AppComponent
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
