import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Forestry} from "../_interfaces/Forestry";
import {IForestryMap} from "../_interfaces/forestry-map-service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForestryMapService implements IForestryMap {

  constructor(private http: HttpClient) {
  }

  getMapData(forestry: Forestry) {
    return this.http.get(environment.apiUrl + "forestry/" + forestry.forestry_id + "/map/geojson/");
  }

  editMapData(forestry: Forestry, geoJson: any) {
    const body = {
      "forestry_id": forestry.forestry_id,
      "map_geojson": geoJson
    }

    return this.http.put<any>(environment.apiUrl + "forestry/" + forestry.forestry_id + "/map/geojson/", body);
  }
}
