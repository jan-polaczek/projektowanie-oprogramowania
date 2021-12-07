import {Injectable} from "@angular/core";
import {IAnimalExistenceList} from "../_interfaces/animal-existence-service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnimalExistence} from "../_interfaces/AnimalExistence";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AnimalExistenceService implements IAnimalExistenceList {

  constructor(private http: HttpClient) {
  }

  getAnimalExistences(): Observable<AnimalExistence[]> {
    return this.http.get<AnimalExistence[]>(`${environment.apiUrl}animalExistences/`);
  }
}
