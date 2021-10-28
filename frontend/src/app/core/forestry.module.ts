import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ForestryDetailsComponent} from './forestry-details/forestry-details.component';
import {ForestryFormComponent} from './forestry-form/forestry-form.component';
import {ForestryListComponent} from './forestry-list/forestry-list.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ForestryListComponent,
    ForestryFormComponent,
    ForestryDetailsComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class ForestryModule {
}
