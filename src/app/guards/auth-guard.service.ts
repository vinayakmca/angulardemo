import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
    console.log(" request "+next);

    console.log("token "+localStorage.getItem("token"));

    if(localStorage.getItem("token")===null){
      this._router.navigate(['/login']);
    }

    // navigate to login page
   // this._router.navigate(['/profile']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return true;
  }

}
