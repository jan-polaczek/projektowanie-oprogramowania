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
      forest_district_name: 'Nadleśnictwo 1',
      forester: 'Sebastian',
      name: 'Leśnictwo 1',
      area: 100
    },
    {
      forestry_id: 2,
      forest_district_id: 1,
      forest_district_name: 'Nadleśnictwo 1',
      forester: 'Szymon',
      name: 'Leśnictwo 2',
      area: 200
    },
    {
      forestry_id: 3,
      forest_district_id: 1,
      forest_district_name: 'Nadleśnictwo 1',
      forester: 'Damian',
      name: 'Leśnictwo 3',
      area: 300
    },
  ];

  foresters: any = ['Damian', 'Szymon', 'Sebastian', 'Bartłomiej'];
  forestDistricts: any = ['Nadleśnictwo 1', 'Nadleśnictwo 2', 'Nadleśnictwo 3'];

  constructor() {
  }

  getForestries(): Observable<Forestry[]> {
    return of(this.forestries);
  }

  deleteForestry(forestryId: number): Observable<Forestry[]> {
    this.forestries = this.forestries.filter(forestry => forestry.forestry_id !== forestryId)
    return of(this.forestries);
  }

  editForestry(forestry: Forestry): Observable<Forestry>  {
    const idx = this.forestries.findIndex((obj => obj.forestry_id == forestry.forestry_id));
    this.forestries[idx] = forestry;
    return of(forestry);
  }

  createForestry(forestry: Forestry): Observable<Forestry>  {
    this.forestries.push(forestry);
    return of(forestry);
  }

  getById(id: number): Observable<Forestry>{
    const forestry = this.forestries.find(x => x.forestry_id == id);
    return of(forestry);
  }
}
