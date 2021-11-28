import {Observable} from 'rxjs';
import {Forestry} from './Forestry';

export interface IForestryMap {
  getMapData(forestry: Forestry): Observable<any>;
}
