import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Locationclass} from "../../../class/locationclass";
import {Router} from "@angular/router";
import {ServiceslocationService} from "../../../services/serviceslocation.service";
import Swal from "sweetalert2";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-locationupdate',
  templateUrl: './locationupdate.component.html',
  styleUrls: ['./locationupdate.component.scss']
})
export class LocationupdateComponent implements OnInit {
  editForm: FormGroup;
  locationclass:Locationclass = new Locationclass();
  submitted = false;

  constructor(private formBuilder: FormBuilder,private serviceslocationService :ServiceslocationService, private  router :Router) { }


  ngOnInit() {
    $(".menulocation").addClass("active");
    let Id = window.localStorage.getItem("editLocationId");
    if(!Id) {
      this.router.navigate(['maps']);
      return;
    }
    this.serviceslocationService.getLocationById(Id)
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

    this.serviceslocationService.updateLocation(this.editForm.value)
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
                    this.router.navigate(["/maps"])
                  }
                })
              },
              error => {
                alert(error);
              });

  }
}
