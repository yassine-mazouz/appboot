import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ServicesuserService} from "../../services/servicesuser.service";
import {Userclass} from "../../class/userclass";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
@Component({
  selector: 'app-userupdate',
  templateUrl: 'userupdate.component.html',
  styleUrls: ['userupdate.component.scss']
})
export class UserupdateComponent implements OnInit {
  editForm: FormGroup;
  userclass:Userclass = new Userclass();

  constructor(private formBuilder: FormBuilder,private servicesuserService :ServicesuserService, private  router :Router) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      deleted: ['', Validators.required]
    });
    this.servicesuserService.getUserById(userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.servicesuserService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate(['/user']);
        },
        error => {
          alert(error);
        });
  }


}
