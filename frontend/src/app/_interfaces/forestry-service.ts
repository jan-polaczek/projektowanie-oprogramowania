import {Observable} from 'rxjs';
import {Forestry, ForestryAddEditRequest} from './Forestry';

export interface IDeleteForestry {
  deleteForestry(id: number): Observable<void>;
}

export interface IListForetries {
  getForestries(): Observable<Forestry[]>;
}

export interface ICreateEditForestry {
  createForestry(forestry: ForestryAddEditRequest): Observable<Forestry>;

  editForestry(id: number, forestry: ForestryAddEditRequest): Observable<Forestry>;
}

export interface IGetForestry {
  getForestryById(id: number): Observable<Forestry>;
}
