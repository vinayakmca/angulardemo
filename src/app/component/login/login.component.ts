import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators, FormArray} from '@angular/forms';
import {UserService} from '../../service/user.service';
import { AuthBody } from '../../model/AuthBody';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false;
  public  authObj:AuthBody=new AuthBody();
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router,) { }


  ngOnInit() {
    this.loginForm=this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required],
     });
  }

  get f(){
    return this.loginForm.controls;
  }

  submitForm(){
   
    this.authObj=<AuthBody>this.loginForm.value;
    this.userService.getToken(this.authObj).subscribe((data)=>{ localStorage.setItem("token",data.response);this.router.navigate(['/user']);} ,(error:any)=>{  console.log("errror message"+error)});
        console.log("form submitted"+JSON.stringify(this.loginForm.value));
  }

}
