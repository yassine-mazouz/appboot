import { Component, OnInit } from '@angular/core';
import {Locationclass} from "../../../class/locationclass";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../user/useradd.component";
import {ServiceslocationService} from "../../../services/serviceslocation.service";
import {Router} from "@angular/router";
import {ServicescategoriesService} from "../../../services/servicescategories.service";
import {Categoriesclass} from "../../../class/categoriesclass";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";

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
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;


  constructor(private httpClient: HttpClient,private formBuilder: FormBuilder,private servicescategoriesService :ServicescategoriesService, private  router :Router) {}

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

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


//Gets called when the user clicks on submit to upload the image
  onUpload() {

    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.categoriesclass.name = this.name.value; uploadImageData.append('nom',this.name.value);
    //Make a call to the Spring Boot Application to save the image
    this.servicescategoriesService.createCategories(uploadImageData).subscribe(data=>{
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
    });





  }



  get name(){
    return this.addForm.get('name');
  }



  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/affichimages/' +  this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
