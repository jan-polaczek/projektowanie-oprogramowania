import {Observable} from 'rxjs';
import {Sensor, SensorData} from './Sensor';
import {AnimalExistence} from "./AnimalExistence";

export interface IAnimalExistenceList {
  getAnimalExistences(): Observable<AnimalExistence[]>;
}
