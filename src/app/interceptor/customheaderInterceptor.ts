import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable, throwError, of, } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';

import {UserService} from '../service/user.service';
import { AuthBody } from '../model/AuthBody';
import { error } from 'util';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class CustomHeaderInterceptor implements HttpInterceptor {

 public  authObj:AuthBody=new AuthBody();
    

    constructor(
        private userService: UserService,private router:Router,private toastr: ToastrService
    ) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {

      console.log("error response "+JSON.stringify(err));
        //handle your auth error or rethrow
        if(err.status>0){
          if(err.status===401){
            console.log("removed item");
            localStorage.removeItem("token");
          }
        if (err.status === 401 || err.status === 403 || err.status === 400) {
            //navigate /delete cookies or whatever
            this.router.navigateByUrl(`/login`);
           
             //   if(err.error!==null){
                  this.toastr.warning(err.error.errMessage);
               // }
                // client-side error
     
            
              
            //this.toastr.warning(err.message);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
      }
      else{
        this.toastr.warning("NO SERVER CONNECTION");
      }
        return throwError(err);
    }

 public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
      let cloneRequest;
        if(req.url.indexOf("/authenticate")>-1){
            cloneRequest=req;
        }
       else
       {
         cloneRequest=req.clone({headers:req.headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`)});
       } 
      

      return next.handle(cloneRequest).pipe(catchError(e=>this.handleAuthError(e)));
  }
}