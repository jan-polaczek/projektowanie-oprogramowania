import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForestryListComponent} from './core/forestry-list/forestry-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'forestry-list', pathMatch: 'full'},
  {path: 'forestry-list', component: ForestryListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
