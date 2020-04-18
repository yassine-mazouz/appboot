import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Userclass} from "../../class/userclass";



@Injectable({
    providedIn: 'root'
})
export class EmployerService {
    public baseUrl = 'http://localhost:8080';
    constructor(public http:HttpClient) { }
    
  
    
    
    
    getUserslist(): Observable<any> {
        return this.http.get<Userclass[]>(`${this.baseUrl}/getUser`);
    }


/*    addUser(user:EmployerData){	    
        return this.http.post(this.url, user);
    }

    updateUser(user:EmployerData){
        return this.http.put(this.url, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    } */
} 
