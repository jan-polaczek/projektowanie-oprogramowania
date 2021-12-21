import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ForestryDetailsComponent} from './forestry-details/forestry-details.component';
import {ForestryFormComponent} from './forestry-form/forestry-form.component';
import {ForestryListComponent} from './forestry-list/forestry-list.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ForestryMapComponent} from "./map/forestry-map.component";
import {AnimalExistenceListComponent} from "./animal-existence-list/animal-existence-list.component";
import {MapDetailsComponent} from "./map-details/map-details.component";
import {PlannedActionsListComponent} from "./planned-actions-list/planned-actions-list.component";
import {StorageListComponent} from "./storage-list/storage-list.component";


@NgModule({
  declarations: [
    ForestryListComponent,
    ForestryFormComponent,
    ForestryDetailsComponent,
    ForestryMapComponent,
    AnimalExistenceListComponent,
    MapDetailsComponent,
    PlannedActionsListComponent,
    StorageListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: []
})
export class ForestryModule {
}
