import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GymComponent } from './components/gym/gym.component';
import { HorizonService } from './services/horizon.service';

import {TabViewModule, FieldsetModule, InputTextModule, CalendarModule, ButtonModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    GymComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    TabViewModule,
    FieldsetModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    DataTableModule
  ],
  providers: [HorizonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
