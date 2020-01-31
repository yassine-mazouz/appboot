import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Locationclass} from "../../../class/locationclass";
import {ServiceslocationService} from "../../../services/serviceslocation.service";
import {Router} from "@angular/router";
import {ServicescategoriesService} from "../../../services/servicescategories.service";
import {Categoriesclass} from "../../../class/categoriesclass";
import {first} from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: 'app-categoriesupdate',
  templateUrl: './categoriesupdate.component.html',
  styleUrls: ['./categoriesupdate.component.scss']
})
export class CategoriesupdateComponent implements OnInit {
  editForm: FormGroup;
  categoriesclass:Categoriesclass = new Categoriesclass();
  submitted = false;

  constructor(private formBuilder: FormBuilder,private servicescategoriesService :ServicescategoriesService, private  router :Router) { }

  ngOnInit() {

    $(".menulocation").addClass("active");
    let Id = window.localStorage.getItem("editCategoriesId");
    if(!Id) {
      this.router.navigate(['maps']);
      return;
    }
    this.servicescategoriesService.getCategoriesById(Id)
      .subscribe( data => {
        this.editForm.setValue(data);
      });

    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      deleted: ['']
    });

  }
  get f() { return this.editForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    this.servicescategoriesService.updateCategories(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {

          Swal.fire({
            icon: 'success',
            title: 'your work has been edited',
            showClass: {
              popup: 'animated fadeInDown faster'
            },
            hideClass: {
              popup: 'animated fadeOutUp faster'
            }
          }).then((result) => {
            if (result.value) {
              this.router.navigate(["/categories"])
            }
          })
        },
        error => {
          alert(error);
        });
  }
}
