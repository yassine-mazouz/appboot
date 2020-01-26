import {Component, NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import {AppComponent} from "../../app.component";
import {HttpClient} from "@angular/common/http";
import {Userclass} from "../../class/userclass";
import {Datatablesclass} from "../../class/datatablesclass";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    DataTablesModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class UserComponent implements OnInit {

  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  user : Userclass[];
  data: any;
  // constructor(private activeRoute:ActivatedRoute , public userService:ServicesuserService
  //   ,private router :Router,private http: HttpClient) { }
    constructor(private http: HttpClient) { }

  ngOnInit() {
    //Datatable
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<Datatablesclass>(
            'http://localhost:8080/getAllRestng',
            dataTablesParameters, {}
          ).subscribe(resp => {
          that.user = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{ data: 'name' }, { data: 'lastName' }, { data: 'email' }, { data: 'id' }]
    };



    }

}
