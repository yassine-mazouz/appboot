import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ServicescategoriesService} from "../../services/servicescategories.service";
import {Categoriesclass} from "../../class/categoriesclass";
import {Datatablesclass} from "../../class/datatablesclass";
import Swal from "sweetalert2";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  categories : Categoriesclass[];
  data: any;

  constructor(private http: HttpClient,private router: Router,private servicescategoriesService :ServicescategoriesService) { }

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
            'http://localhost:8080/getAllCategories',
            dataTablesParameters, {}
          ).subscribe(resp => {
          that.categories = resp.data;

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

  deleteCategories(id: number) {
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

        this.servicescategoriesService.deleteCategories(id)
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


  editCategories(id: number) {
    window.localStorage.removeItem("editCategoriesId");
    window.localStorage.setItem("editCategoriesId", id.toString());
    this.router.navigate(['categoriesupdate']);
  }


}
