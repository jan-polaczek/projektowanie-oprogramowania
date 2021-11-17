import {Observable} from 'rxjs';
import {Forestry, ForestryAddEditRequest} from './Forestry';

export interface IForestryList {
  deleteForestry(id: number): Observable<void>;

  getForestries(): Observable<Forestry[]>;
}

export interface IForestryForm {
  createForestry(forestry: ForestryAddEditRequest): Observable<Forestry>;

  editForestry(id: number, forestry: ForestryAddEditRequest): Observable<Forestry>;

  getForestryById(id: number): Observable<Forestry>;
}
