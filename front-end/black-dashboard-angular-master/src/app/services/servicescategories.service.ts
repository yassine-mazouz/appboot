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



  createCategories( categoriesclass:Categoriesclass) {
    return this.http.post(`${this.baseUrl}/createcategories`,categoriesclass,{responseType : 'text' as 'json'});

  }

  getCategoriesById(Id: string): Observable<any>  {
    return this.http.get<Categoriesclass[]>(`${this.baseUrl}/GetOneCategoriesRest/`+Id);

  }

  updateCategories(categoriesclass:Categoriesclass) {
    return this.http.post<Locationclass[]>(`${this.baseUrl}/updatecategories/`+categoriesclass.id, categoriesclass,{responseType : 'text' as 'json'});

  }

  deleteCategories(id: number) {
    return this.http.post<Categoriesclass[]>(`${this.baseUrl}/deleteCategoriesRest/`+id,{responseType : 'text' as 'json'});

  }



}
