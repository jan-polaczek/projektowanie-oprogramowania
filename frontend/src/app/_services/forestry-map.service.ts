import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Forestry} from "../_interfaces/Forestry";
import {IForestryMap} from "../_interfaces/forestry-map-service";

@Injectable({
  providedIn: 'root'
})
export class ForestryMapService implements IForestryMap {

  constructor(private http: HttpClient) {
  }

  getMapData(forestry: Forestry) {
    return this.http.get("/assets/sample.geojson");
  }
}
