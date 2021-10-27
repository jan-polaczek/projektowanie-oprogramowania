import {Component, OnInit} from '@angular/core';
import {Forestry} from "../../_services/forestry.service";

@Component({
  selector: 'app-forestry-list',
  templateUrl: './forestry-list.component.html',
  styleUrls: ['./forestry-list.component.scss'],
})
export class ForestryListComponent implements OnInit {

  forestries: Forestry[] = [
    {
      forestry_id: 1,
      forest_district_id: 1,
      forest_district_name: "Nadleśnictwo 1",
      forester: "Grzegorz Brzęczyszczykiewicz",
      name: "Leśnictwo 1",
      area: 100
    },
    {
      forestry_id: 2,
      forest_district_id: 1,
      forest_district_name: "Nadleśnictwo 1",
      forester: "Grzegorz Brzęczyszczykiewicz",
      name: "Leśnictwo 2",
      area: 200
    },
    {
      forestry_id: 3,
      forest_district_id: 1,
      forest_district_name: "Nadleśnictwo 1",
      forester: "Grzegorz Brzęczyszczykiewicz",
      name: "Leśnictwo 3",
      area: 300
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
