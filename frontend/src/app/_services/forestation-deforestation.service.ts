import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ForestryAction, IPlannedActionsList} from "../_interfaces/ForestryAction";

@Injectable({
  providedIn: 'root'
})
export class ForestationDeforestationService implements IPlannedActionsList {

  constructor(private http: HttpClient) {
  }

  getForestations(forestryId: number): Observable<ForestryAction[]> {
    return this.http.get<ForestryAction[]>(environment.apiUrl + "forestry/" + forestryId + "/forestations/");
  }

  getDeforestations(forestryId: number): Observable<ForestryAction[]> {
    return this.http.get<ForestryAction[]>(environment.apiUrl + "forestry/" + forestryId + "/deforestations/");
  }
}
