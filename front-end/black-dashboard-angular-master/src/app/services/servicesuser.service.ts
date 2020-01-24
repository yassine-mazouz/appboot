import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Userclass} from "../class/userclass";


@Injectable({
  providedIn: 'root'
})
export class ServicesuserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  getUserList(): Observable<any> {
    return this.http.get<Userclass[]>(`${this.baseUrl}/getAllRest`);
  }
}
