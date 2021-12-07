import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IMapDetails} from "../_interfaces/map-service";
import {MapDetails} from "../_interfaces/MapDetails";

@Injectable({
  providedIn: 'root',
})
export class MapService implements IMapDetails {

  constructor(private http: HttpClient) {
  }

  getMapDetailsById(id: number): Observable<MapDetails> {
    return this.http.get<MapDetails>(`${environment.apiUrl}map/${id}/data`);
  }

}
