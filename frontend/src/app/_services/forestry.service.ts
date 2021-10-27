import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForestryService {

  constructor() {
  }
}

export interface ForestDistrict {
  forest_district_id: number
  forest_manager: Employee
  name: string
  forestries: Forestry[]
}

export interface Forestry {
  forestry_id: number;
  forest_district_id: number;
  forest_district_name: string;
  forester: string; // todo -> Employee
  name: string;
  area: number;
}

export interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}
