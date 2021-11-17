import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Employee} from '../_interfaces/Employee';
import {Forestry, ForestryAddEditRequest} from '../_interfaces/Forestry';
import {IForestryForm, IForestryList} from '../_interfaces/forestry-service';

@Injectable({
  providedIn: 'root',
})
export class ForestryService implements IForestryList, IForestryForm {

  foresters: Employee[] = [
    {
      employee_id: 0,
      first_name: 'Damian',
      last_name: 'Smugorzewski',
      email: 'damian@forestryapp.com',
      phone_number: '123456789',
    },
    {
      employee_id: 1,
      first_name: 'Szymon',
      last_name: 'Wydziałkiewicz',
      email: 'szymon@forestryapp.com',
      phone_number: '234567891',
    },
    {
      employee_id: 2,
      first_name: 'Sebastian',
      last_name: 'Jurga',
      email: 'sebastian@forestryapp.com',
      phone_number: '345678912',
    },
    {
      employee_id: 3,
      first_name: 'Bartłomiej',
      last_name: 'Rosa',
      email: 'bartłomiej@forestryapp.com',
      phone_number: '456789123',
    }];

  forestries: Forestry[] = [
    {
      forestry_id: 1,
      forestry_district_id: 1,
      forestry_district_name: 'Nadleśnictwo 1',
      forester: 0,
      name: 'Leśnictwo 1',
      area: 100,
    },
    {
      forestry_id: 2,
      forestry_district_id: 1,
      forestry_district_name: 'Nadleśnictwo 1',
      forester: 1,
      name: 'Leśnictwo 2',
      area: 200,
    },
    {
      forestry_id: 3,
      forestry_district_id: 1,
      forestry_district_name: 'Nadleśnictwo 1',
      forester: 2,
      name: 'Leśnictwo 3',
      area: 300,
    },
  ];

  forestDistricts: any = [
    {
      id: 1,
      name: 'Nadleśnictwo 1',
    },
    {
      id: 2,
      name: 'Nadleśnictwo 2',
    },
    {
      id: 3,
      name: 'Nadleśnictwo 3',
    }];

  constructor(private http: HttpClient) {
  }

  getForestries(): Observable<Forestry[]> {
    return this.http.get<Forestry[]>(`${environment.apiUrl}forestries`);
  }

  deleteForestry(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}forestry/${id}`);
  }

  editForestry(id: number, forestry: ForestryAddEditRequest): Observable<Forestry> {
    return this.http.patch<Forestry>(`${environment.apiUrl}forestry/${id}`, forestry);
  }

  createForestry(forestry: ForestryAddEditRequest): Observable<Forestry> {
    return this.http.post<Forestry>(`${environment.apiUrl}forestries/`, forestry);
  }

  getForestryById(id: number): Observable<Forestry> {
    return this.http.get<Forestry>(`${environment.apiUrl}forestry/${id}`);
  }
}
