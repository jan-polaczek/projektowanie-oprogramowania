import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForestryListComponent} from './core/forestry-list/forestry-list.component';
import {ForestryFormComponent} from './core/forestry-form/forestry-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'forestry-list', pathMatch: 'full'},
  {path: 'forestry-list', component: ForestryListComponent},
  {path: 'form', component: ForestryFormComponent},
  { path: 'form/:id', component: ForestryFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
