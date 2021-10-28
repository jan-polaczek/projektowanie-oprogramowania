import {Injectable} from '@angular/core';
import {Forestry} from "../_interfaces/Forestry";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ForestryService {

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

  getForestries(): Observable<Forestry[]> {
    return of(this.forestries);
  }

  deleteForestry(forestryId: number): Observable<Forestry[]> {
    this.forestries = this.forestries.filter(forestry => forestry.forestry_id !== forestryId)
    return of(this.forestries);
  }
}
