import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ServicesuserService} from "../../services/servicesuser.service";
import {Userclass} from "../../class/userclass";
import {Router} from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "useradd.component.html",
  styleUrls: ["useradd.component.scss"]
})
export class UseraddComponent implements OnInit {

  userclass:Userclass = new Userclass();
  addForm: FormGroup;
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
      deleted: ['', Validators.required]
    });

  }

  deleteFile(file: any) {

  }

  save() {
    this.servicesuserService.createUser(this.userclass).subscribe(data=>{
      this.userclass = new Userclass();
      this.goTolist();
      },err=>{
      alert('Error');
    })
  }

  goTolist()
  {
    this.router.navigate(["/user"])
  }

}
