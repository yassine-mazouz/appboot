import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Locationclass} from "../../../class/locationclass";
import {MyErrorStateMatcher} from "../../user/useradd.component";
import {Router} from "@angular/router";
import {ServiceslocationService} from "../../../services/serviceslocation.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-locationadd',
  templateUrl: './locationadd.component.html',
  styleUrls: ['./locationadd.component.scss']
})
export class LocationaddComponent implements OnInit {
  locationclass:Locationclass = new Locationclass();
  addForm: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,private serviceslocationService :ServiceslocationService, private  router :Router) {}

  ngOnInit() {

    $(".menulocation").addClass("active");
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
this.serviceslocationService.createLocation(this.addForm.value).subscribe(data=>{
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
                this.router.navigate(["/maps"])
              }
            })


          },err=>{
            alert('Error');
          })

  }
}
