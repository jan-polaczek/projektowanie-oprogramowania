import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Sensor, SensorData} from '../_interfaces/Sensor';
import {ISensorReports, ISensorList} from '../_interfaces/sensor-service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SensorService implements ISensorReports, ISensorList {

  sensors: Sensor[] = [
    {
      id: 1,
      type: {
        id: 1,
        unit: '\'C',
        name: 'termometr',
        max_std_value: '100',
        min_std_value: '1',
      },
      forestry_id: 5,
      name: 'Term1',
      x: '1',
      y: '2',
      z: '3',
    }
  ];

  sensorData: SensorData[] = [
    {
      sensor_id: 1,
      value: 5,
      date: new Date(Date.now())
    },
    {
      sensor_id: 1,
      value: 10,
      date: new Date(Date.now())
    },
    {
      sensor_id: 1,
      value: 15,
      date: new Date(Date.now())
    },
  ];

  constructor(private http: HttpClient) {
  }

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${environment.apiUrl}sensors/`);
    //return of(this.sensors);
  }

  getSensorDataById(id: number, from: Date, to: Date): Observable<SensorData[]> {
    return this.http.post<SensorData[]>(`${environment.apiUrl}sensor/data`, {sensor_id: id, date_from: from, date_to: to});
    //return of(this.sensorData);
  }
}
