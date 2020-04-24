import {Component, OnInit, Inject, NgModule} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {Userclass} from "../../../class/userclass";
import {ErrorStateMatcher} from "@angular/material/core";
import {EmployerService} from "../employer.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import Swal from 'sweetalert2';
import {ChangeDetectorRef} from '@angular/core';
import {delay, first} from "rxjs/operators";
import {EmployerComponent} from "../employer.component";
import {routes} from "../employer.module";



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  private employerComponent: EmployerComponent;
  public form:FormGroup;
  public passwordHide:boolean = true;
  public colors = [
    {value: 'gradient-purple', viewValue: 'Purple'},
    {value: 'gradient-indigo', viewValue: 'Indigo'},
    {value: 'gradient-teal', viewValue: 'Teal'},
    {value: 'gradient-blue', viewValue: 'Blue'},
    {value: 'gradient-orange', viewValue: 'Orange'},
    {value: 'gradient-green', viewValue: 'Green'},
    {value: 'gradient-pink', viewValue: 'Pink'},
    {value: 'gradient-red', viewValue: 'Red'},
    {value: 'gradient-amber', viewValue: 'Amber'},
    {value: 'gradient-gray', viewValue: 'Gray'},
    {value: 'gradient-brown', viewValue: 'Brown'},
    {value: 'gradient-lime', viewValue: 'Lime'}
  ];
  private submitted = false;
  email: string;
  public page:any;
  showComponent: any;
  public id  = this.employerService.currentuser
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user,
              public fb: FormBuilder,
              private formBuilder: FormBuilder,
              private employerService :EmployerService,
              private cd : ChangeDetectorRef,
              private route : ActivatedRoute,
              private  router :Router) {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      lastname: [null, Validators.compose([Validators.required, Validators.minLength(6)])],       
      email: null,
      password: null,
      phone: null,
      facebook: null,
      twitter: null,
      google: null,
      bgcolor: null,
      role: null,
      adress: null,
      imageurl: null,
      salaire:null
     
    });
  }

  ngOnInit() {
    
    if(this.user){


      this.employerService.getUserById(this.user).pipe(delay(500)).subscribe( data => {
        this.user = data;
      });
      
    } 
    else{
      this.user = new Userclass();
    }


    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      salaire : [''],
      phone : [''],
      facebook: [''],
      twitter:  [''],
      google:  [''],
      bgcolor:  [''],
      adress: [''],
      imageurl: [''],
    });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmpassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  close(): void {
    this.dialogRef.close();
  }
  
  
  
  save() {
    if(this.user)
    {
      this.employerService.checkmail(this.email)
          .subscribe( check => {

            // @ts-ignore
            if(check != 0) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This email existe déja!'
              })
            } else {
              this.employerService.updateUser(this.form.value)
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
                          }
                        })
                      },
                      error => {
                        alert(error);
                      });
            }
          })
    }else{
      this.employerService.checkmail(this.email)
          .subscribe( data => {

            if(data!=0){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This email existe déja!'
              })
            }else{
              this.employerService.createUser(this.form.value).subscribe(data=>{
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

                  }
                })


              },err=>{
                alert('Error');
              })
            }
          });
    }
    

   
  }

}
