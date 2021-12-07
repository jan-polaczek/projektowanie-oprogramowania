import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Forestry} from "../_interfaces/Forestry";
import {IForestryMap, MapData} from "../_interfaces/forestry-map-service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForestryMapService implements IForestryMap {

  constructor(private http: HttpClient) {
  }

  getMapData(forestry: Forestry): Observable<MapData> {
    return this.http.get<MapData>(environment.apiUrl + "forestry/" + forestry.forestry_id + "/map/geojson/");
  }

  editMapData(mapData: MapData): Observable<MapData> {
    return this.http.put<MapData>(environment.apiUrl + "forestry/" + mapData.forestry_id + "/map/geojson/", mapData);
  }
}
