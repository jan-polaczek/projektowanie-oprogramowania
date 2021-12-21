import {Observable} from 'rxjs';
import {ForestryResource} from './ForestryResource';

export interface IForestryStorage {
  getForestryResources(forestryId: number): Observable<ForestryResource[]>;
}

