import {Observable} from 'rxjs';
import {Forestry} from './Forestry';

export interface IForestryMap {
  getMapData(forestry: Forestry): Observable<MapData>;

  editMapData(mapData: MapData): Observable<MapData>;
}

export interface MapData {
  forestry_id: number;
  map_geojson: any;
}
