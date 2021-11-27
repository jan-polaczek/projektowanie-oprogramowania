import {Observable} from 'rxjs';
import {Sensor, SensorData} from './Sensor';

export interface ISensorList {
  getSensors(): Observable<Sensor[]>;
}

export interface ISensorReports {
  getSensorDataById(id: number, from: Date, to: Date): Observable<SensorData[]>;
}
