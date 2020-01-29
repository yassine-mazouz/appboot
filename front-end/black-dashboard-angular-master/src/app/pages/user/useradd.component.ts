import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ServicesuserService} from "../../services/servicesuser.service";
import {Userclass} from "../../class/userclass";
import {Router} from "@angular/router";
import Swal from "sweetalert2";


@Component({
  selector: "app-user",
  templateUrl: "useradd.component.html",
  styleUrls: ["useradd.component.scss"]
})
export class UseraddComponent implements OnInit {

  userclass:Userclass = new Userclass();
  addForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private servicesuserService :ServicesuserService, private  router :Router) {}

  ngOnInit() {
    $(".menuuser").addClass("active");
    this.addForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      deleted: ['']
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      alert("gg");
      return;
    }
    this.servicesuserService.createUser(this.addForm.value).subscribe(data=>{
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
          this.router.navigate(["/user"])
        }
      })


    },err=>{
      alert('Error');
    })
  }
}
