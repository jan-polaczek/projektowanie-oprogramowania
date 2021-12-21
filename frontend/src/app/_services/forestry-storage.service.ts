import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IForestryStorage} from '../_interfaces/forestry-storage';
import {ForestryResource} from '../_interfaces/ForestryResource';

@Injectable({
  providedIn: 'root',
})
export class ForestryStorageService implements IForestryStorage {

  constructor(private http: HttpClient) {
  }

  getForestryResources(forestryId: number): Observable<ForestryResource[]> {
    return this.http.get<ForestryResource[]>(environment.apiUrl + 'forestry/' + forestryId + '/resources/?type_filter=1');
  }
}
