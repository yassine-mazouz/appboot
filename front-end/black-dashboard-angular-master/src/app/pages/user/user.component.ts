import {Component, NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";
import {ServicesuserService} from "../../services/servicesuser.service";
import { DataTablesModule } from 'angular-datatables';
import {AppComponent} from "../../app.component";

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
  data: any;
  constructor(private activeRoute:ActivatedRoute , public userService:ServicesuserService
    ,private router :Router) { }

  ngOnInit() {
    //Datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      processing: true
    };
    //data user
    this.userService.getUserList().subscribe(
      data =>{
        this.data = data;
      },err => {
        console.log("ko");
      });


    }

}
