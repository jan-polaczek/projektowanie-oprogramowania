import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DateDirective} from '../_directives/date.directive';
import {AnimalExistenceListComponent} from './animal-existence-list/animal-existence-list.component';
import {DeforestationFormComponent} from './deforestation-form/deforestation-form.component';
import {ForestationFormComponent} from './forestation-form/forestation-form.component';
import {ForestryDetailsComponent} from './forestry-details/forestry-details.component';
import {ForestryFormComponent} from './forestry-form/forestry-form.component';
import {ForestryListComponent} from './forestry-list/forestry-list.component';
import {MapDetailsComponent} from './map-details/map-details.component';
import {ForestryMapComponent} from './map/forestry-map.component';
import {PlannedActionsListComponent} from './planned-actions-list/planned-actions-list.component';
import {StorageListComponent} from './storage-list/storage-list.component';


@NgModule({
  declarations: [
    ForestryListComponent,
    ForestryFormComponent,
    ForestryDetailsComponent,
    ForestryMapComponent,
    AnimalExistenceListComponent,
    MapDetailsComponent,
    PlannedActionsListComponent,
    StorageListComponent,
    ForestationFormComponent,
    DeforestationFormComponent,
    DateDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class ForestryModule {
}
