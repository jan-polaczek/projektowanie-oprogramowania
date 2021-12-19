import {Observable} from "rxjs";

export interface ForestryAction {
  id: number;
  plant_type: number;
  start_date: Date;
  end_date: Date;
  region?: any;
  number_of_trees: number;
  typeId?: number;
}

export interface IPlannedActionsList {
  getForestations(forestryId: number): Observable<ForestryAction[]>;
  getDeforestations(forestryId: number): Observable<ForestryAction[]>;
}
