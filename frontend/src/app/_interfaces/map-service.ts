import {Observable} from 'rxjs';
import {MapDetails} from "./MapDetails";

export interface IMapDetails {
  getMapDetailsById(id: number): Observable<MapDetails>;
}
