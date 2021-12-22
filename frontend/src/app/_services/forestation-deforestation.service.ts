import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ForestryAction, IForestationForm, IPlannedActionsList} from '../_interfaces/ForestryAction';

@Injectable({
  providedIn: 'root',
})
export class ForestationDeforestationService implements IPlannedActionsList, IForestationForm {

  constructor(private http: HttpClient) {
  }

  getForestations(forestryId: number): Observable<ForestryAction[]> {
    return this.http.get<ForestryAction[]>(environment.apiUrl + 'forestry/' + forestryId + '/forestations/');
  }

  getDeforestations(forestryId: number): Observable<ForestryAction[]> {
    return this.http.get<ForestryAction[]>(environment.apiUrl + 'forestry/' + forestryId + '/deforestations/');
  }

  deleteForestation(forestryId: number, actionId: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + 'forestry/' + forestryId + '/forestation/' + actionId);
  }

  deleteDeforestation(forestryId: number, actionId: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + 'forestry/' + forestryId + '/deforestation/' + actionId);
  }

  addForestation(forestryId: number, forestryAction: ForestryAction): Observable<ForestryAction> {
    return this.http.post<ForestryAction>(environment.apiUrl + 'forestry/' + forestryId + '/forestations/', forestryAction);
  }
}
