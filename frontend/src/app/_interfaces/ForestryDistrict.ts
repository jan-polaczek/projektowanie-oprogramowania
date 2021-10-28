import {Employee} from "./Employee";
import {Forestry} from "./Forestry";

export interface ForestDistrict {
  forest_district_id: number
  forest_manager: Employee
  name: string
  forestries: Forestry[]
}
