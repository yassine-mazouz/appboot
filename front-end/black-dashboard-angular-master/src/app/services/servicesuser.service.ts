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

  getUserById(id: string): Observable<any> {
    return this.http.get<Userclass[]>(`${this.baseUrl}/GetOneUserRest/`+id);
  }

  updateUser(userclass:Userclass ) {
    return this.http.post<Userclass[]>(`${this.baseUrl}/updateuser/`+userclass.id, userclass,{responseType : 'text' as 'json'});

  }

  deleteUser(id: number): Observable<any>  {
    return this.http.post<Userclass[]>(`${this.baseUrl}/deleteUserRest/`+id,{responseType : 'text' as 'json'});

  }

  checkmail(val: string | number | string[]): Observable<any>  {
    return this.http.get<Userclass[]>(`${this.baseUrl}/chackmail/`+val);
  }


  checkmailedit(val: string | number | string[], val2: string | number | string[]) {
    return this.http.get<Userclass[]>(`${this.baseUrl}/checkmailedit/`+val+'/'+val2);

  }
}
