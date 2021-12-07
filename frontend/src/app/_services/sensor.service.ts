import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Sensor, SensorData} from '../_interfaces/Sensor';
import {ISensorList, ISensorReports} from '../_interfaces/sensor-service';

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

  getSensorDataById(id: number): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${environment.apiUrl}sensor/${id}/data`);
    //return of(this.sensorData);
  }
}
