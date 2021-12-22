import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnimalExistenceListComponent} from './core/animal-existence-list/animal-existence-list.component';
import {ForestationFormComponent} from './core/forestation-form/forestation-form.component';
import {ForestryFormComponent} from './core/forestry-form/forestry-form.component';
import {ForestryListComponent} from './core/forestry-list/forestry-list.component';
import {MapDetailsComponent} from './core/map-details/map-details.component';
import {PlannedActionsListComponent} from './core/planned-actions-list/planned-actions-list.component';
import {SensorListComponent} from './core/sensor-list/sensor-list.component';
import {StorageListComponent} from './core/storage-list/storage-list.component';
import {DeforestationFormComponent} from "./core/deforestation-form/deforestation-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'forestry-list', pathMatch: 'full'},
  {path: 'forestry-list', component: ForestryListComponent},
  {path: 'animal-existence-list', component: AnimalExistenceListComponent},
  {path: 'map-details', component: MapDetailsComponent},
  {path: 'form', component: ForestryFormComponent},
  {path: 'form/:id', component: ForestryFormComponent},
  {path: 'sensor-list', component: SensorListComponent},
  {path: 'sensor-list/:id', component: SensorListComponent},
  {path: 'storage-list/:id', component: StorageListComponent},
  {path: 'planned-actions-list/:id', component: PlannedActionsListComponent},
  {path: 'planned-actions-list/:id/forestation', component: ForestationFormComponent},
  {path: 'planned-actions-list/:id/deforestation', component: DeforestationFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
