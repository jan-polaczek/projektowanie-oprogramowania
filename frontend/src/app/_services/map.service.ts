import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Forestry} from "../_interfaces/Forestry";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) {
  }

  getMap(forestry: Forestry) {
    return this.http.get("/assets/sample.geojson");
  }
}
