import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Userclass} from "../../class/userclass";
import {HttpClient} from "@angular/common/http";



export class EmployerData implements InMemoryDbService {

    public baseUrl = 'http://localhost:8080';
    private http: HttpClient;
  createDb() {
      const users = this.http.get<Userclass[]>(`${this.baseUrl}/getUser`);
    return  users;
  }
}
