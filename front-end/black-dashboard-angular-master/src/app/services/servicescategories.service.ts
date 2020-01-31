import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ResponseType} from "@angular/http";
import {Locationclass} from "../class/locationclass";
import {Userclass} from "../class/userclass";
import {Categoriesclass} from "../class/categoriesclass";


@Injectable({
  providedIn: 'root'
})
export class ServicescategoriesService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}



  createLocation( locationclass:Locationclass) {
    return this.http.post(`${this.baseUrl}/createlocation`,locationclass,{responseType : 'text' as 'json'});

  }

  getLocationById(Id: string): Observable<any>  {
    return this.http.get<Locationclass[]>(`${this.baseUrl}/GetOneLocationRest/`+Id);

  }

  updateLocation(locationclass:Locationclass) {
    return this.http.post<Locationclass[]>(`${this.baseUrl}/updatelocation/`+locationclass.id, locationclass,{responseType : 'text' as 'json'});

  }

  deleteCategories(id: number) {
    return this.http.post<Categoriesclass[]>(`${this.baseUrl}/deleteCategoriesRest/`+id,{responseType : 'text' as 'json'});

  }
}
