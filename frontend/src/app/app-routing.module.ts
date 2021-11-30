import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForestryListComponent} from './core/forestry-list/forestry-list.component';
import {ForestryFormComponent} from './core/forestry-form/forestry-form.component';
import {SensorListComponent} from './core/sensor-list/sensor-list.component';
import {AnimalExistenceListComponent} from "./core/animal-existence-list/animal-existence-list.component";
import {MapDetailsComponent} from "./core/map-details/map-details.component";

const routes: Routes = [
  {path: '', redirectTo: 'forestry-list', pathMatch: 'full'},
  {path: 'forestry-list', component: ForestryListComponent},
  {path: 'animal-existence-list', component: AnimalExistenceListComponent},
  {path: 'map-details', component: MapDetailsComponent},
  {path: 'form', component: ForestryFormComponent},
  {path: 'form/:id', component: ForestryFormComponent},
  {path: 'sensor-list', component: SensorListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
