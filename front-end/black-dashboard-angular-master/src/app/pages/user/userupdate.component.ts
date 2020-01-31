import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ServicesuserService} from "../../services/servicesuser.service";
import {Userclass} from "../../class/userclass";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import Swal from "sweetalert2";
@Component({
  selector: 'app-userupdate',
  templateUrl: 'userupdate.component.html',
  styleUrls: ['userupdate.component.scss']
})
export class UserupdateComponent implements OnInit {
  editForm: FormGroup;
  userclass:Userclass = new Userclass();
  submitted = false;

  constructor(private formBuilder: FormBuilder,private servicesuserService :ServicesuserService, private  router :Router) { }

  ngOnInit() {
    $(".menuuser").addClass("active");
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      this.router.navigate(['user']);
      return;
    }
    this.servicesuserService.getUserById(userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      deleted: [''],
      confirmpassword: ['', Validators.required]
    }, {validator: this.checkPasswords });

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmpassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }
  get f() { return this.editForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.servicesuserService.checkmailedit($("#email").val(),$("#id").val())
      .subscribe( check => {

        // @ts-ignore
        if(check != 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This email existe déja!'
          })
        } else {
          this.servicesuserService.updateUser(this.editForm.value)
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
                    this.router.navigate(["/user"])
                  }
                })
              },
              error => {
                alert(error);
              });
        }
      })



  }


}
