import { Component, OnInit } from '@angular/core';
import {Locationclass} from "../../../class/locationclass";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../user/useradd.component";
import {ServiceslocationService} from "../../../services/serviceslocation.service";
import {Router} from "@angular/router";
import {ServicescategoriesService} from "../../../services/servicescategories.service";
import {Categoriesclass} from "../../../class/categoriesclass";
import Swal from "sweetalert2";

@Component({
  selector: 'app-categoriesadd',
  templateUrl: './categoriesadd.component.html',
  styleUrls: ['./categoriesadd.component.scss']
})
export class CategoriesaddComponent implements OnInit {
  categoriesclass:Categoriesclass = new Categoriesclass();
  addForm: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,private servicescategoriesService :ServicescategoriesService, private  router :Router) {}

  ngOnInit() {

    $(".menucategories").addClass("active");
    this.addForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      deleted: ['']
    });
  }
  get f() { return this.addForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.servicescategoriesService.createCategories(this.addForm.value).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
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


    },err=>{
      alert('Error');
    })
  }
}
