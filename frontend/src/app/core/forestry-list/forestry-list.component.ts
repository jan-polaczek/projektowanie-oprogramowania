import {Component, OnInit} from '@angular/core';
import {ForestryService} from "../../_services/forestry.service";
import {Forestry} from "../../_interfaces/Forestry";

@Component({
  selector: 'app-forestry-list',
  templateUrl: './forestry-list.component.html',
  styleUrls: ['./forestry-list.component.scss'],
})
export class ForestryListComponent implements OnInit {

  forestries: Forestry[];

  constructor(private forestryService: ForestryService) {
  }

  ngOnInit(): void {
    this.forestryService.getForestries().subscribe(forestries => this.forestries = forestries);
  }

}
