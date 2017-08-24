import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GymComponent } from './components/gym/gym.component';
import { HorizonService } from './services/horizon.service';

import { InputTextareaModule, ConfirmDialogModule, DialogModule, DataGridModule, SelectButtonModule, PanelModule, TabViewModule, FieldsetModule, InputTextModule, CalendarModule, ButtonModule, DataTableModule } from 'primeng/primeng';
import { EditSubscriptionComponent } from './components/edit-subscription/edit-subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    GymComponent,
    EditSubscriptionComponent
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
    DataTableModule,
    PanelModule,
    SelectButtonModule,
    DataGridModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule
  ],
  providers: [HorizonService],
  bootstrap: [AppComponent]
})
export class AppModule { }