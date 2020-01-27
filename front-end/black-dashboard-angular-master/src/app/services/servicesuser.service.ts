import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Userclass} from "../class/userclass";
import {ResponseType} from "@angular/http";


@Injectable({
  providedIn: 'root'
})
export class ServicesuserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  getUserList(): Observable<any> {
    return this.http.get<Userclass[]>(`${this.baseUrl}/getAllRest`);
  }


  createUser(userclass:Userclass )
  {
    return this.http.post(`${this.baseUrl}/createuser`,userclass,{responseType : 'text' as 'json'});
  }
}
