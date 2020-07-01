import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import {environment} from './../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLoginButton:Observable<boolean>;
  title:string="";

  constructor(private _router: Router,private userService:UserService) { 
         this.showLoginButton=userService.isLoggedIn();
  }

  ngOnInit() {
     this.title=environment.title;
  }

  login(){
   this._router.navigate(['/login']);
  }

  logout(){
    localStorage.removeItem("token");
    this.userService.setUserLoginButtonValue(true);
    this._router.navigate(['/login']);
  }

}
