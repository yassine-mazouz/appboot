import { Component, OnInit } from "@angular/core";
import {Locationclass} from "../../class/locationclass";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Datatablesclass} from "../../class/datatablesclass";
import Swal from "sweetalert2";
import {ServiceslocationService} from "../../services/serviceslocation.service";



@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  location : Locationclass[];
  data: any;

  constructor(private http: HttpClient,private router: Router,private serviceslocationService :ServiceslocationService) { }

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
            'http://localhost:8080/getAllLocation',
            dataTablesParameters, {}
          ).subscribe(resp => {
          that.location = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{ data: 'name' }, { data: 'id' }]
    };

  }

  deleteLocation(id: number) {
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

        this.serviceslocationService.deleteLocation(id)
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

  editLocation(id: number) {
    window.localStorage.removeItem("editLocationId");
    window.localStorage.setItem("editLocationId", id.toString());
    this.router.navigate(['locationupdate']);
  }
}
