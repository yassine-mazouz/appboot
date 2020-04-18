import {Component, NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import {AppComponent} from "../../app.component";
import {HttpClient} from "@angular/common/http";
import {Userclass} from "../../class/userclass";
import {Datatablesclass} from "../../class/datatablesclass";
import {Router} from "@angular/router";
import {Validators} from "@angular/forms";
import {ServicesuserService} from "../../services/servicesuser.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  user : Userclass[];
  data: any;
  // constructor(private activeRoute:ActivatedRoute , public userService:ServicesuserService
  //   ,private router :Router,private http: HttpClient) { }

    constructor(private http: HttpClient,private router: Router,private servicesuserService :ServicesuserService) { }

  ngOnInit() {
    //Datatable
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      lengthMenu: [5, 10, 20, 50, 100, 200, 500],
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
      columns: [{ data: 'name' }, { data: 'lastname' }, { data: 'email' }, { data: 'id' }]
    };



    }

  editUser(id: number) {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", id.toString());
    this.router.navigate(['userupdate']);
  }


  deleteUser(id: number) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this.servicesuserService.deleteUser(id)
          .subscribe( data => {
            $('#datatable').DataTable().ajax.reload();
          })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
