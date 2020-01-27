import { Component, OnInit } from "@angular/core";
import {NgForm} from "@angular/forms";
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
  constructor(private servicesuserService :ServicesuserService, private  router :Router) {}

  ngOnInit() {
    $(".menuuser").addClass("active");

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
