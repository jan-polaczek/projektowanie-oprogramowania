import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ForestryDetailsComponent} from './forestry-details/forestry-details.component';
import {ForestryFormComponent} from './forestry-form/forestry-form.component';
import {ForestryListComponent} from './forestry-list/forestry-list.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ForestryListComponent,
    ForestryFormComponent,
    ForestryDetailsComponent,
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
