import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {
  
  productForm:FormGroup;
  fileData:File=null;
  submitted:boolean=false;
  public minDate: Date = new Date ("05/07/2017");
  public maxDate: Date = new Date ("08/27/2021");

  cities:string[]=['Pune','Kolhapur','Mumbai','Satara'];
  
  constructor(private fb:FormBuilder,public userService:UserService) { }



  ngOnInit() {
    this.productForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.email,Validators.required]],
      mobile:['',Validators.maxLength(10)],
      image:[''],
      birthDate:['',Validators.required],
      gender:['',Validators.required],
      city:['',Validators.required]
     });

  }

  get f(){
    return this.productForm.controls;
  }

  downloadPdf( ) {
    const pdfUrl = './assets/mar-02-2020.pdf';
    const pdfName = 'testvinayak';
   // this.userService.downloadPdfFileFromLink().subscribe((res)=>{FileSaver.saveAs(res, pdfName);});
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  imageUpload(event){
     event.preventDefault();
    console.log("image data"+JSON.stringify(event.target));
    this.fileData = <File>event.target.files[0];
   
    const formdata=new FormData();
    formdata.append("file",this.fileData);
    this.userService.fileUplaod(formdata).subscribe((res:any) => {
      console.log(JSON.stringify(res));
      })
  
  }

  onValueChange(data){
    this.productForm.patchValue({birthDate:data.value.toLocaleDateString()});
    console.log("calaned data "+data.value.toLocaleDateString());
  }

  filterCity(data){
    console.log("selected city "+data);
  }

  submitForm(){
    console.log("submit event called"+JSON.stringify(this.productForm.value));
    this.submitted=true;
  }

}
