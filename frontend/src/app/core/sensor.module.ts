import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SensorListComponent} from './sensor-list/sensor-list.component';
import {SensorDetailsComponent} from './sensor-details/sensor-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SensorListComponent,
    SensorDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: []
})
export class SensorModule {
}
