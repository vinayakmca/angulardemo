import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';
import {User} from '../model/user';
import { Observable,throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AuthBody } from '../model/AuthBody';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   apiUrl:string="http://localhost:8585/baeldung";
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  httpParam=new HttpParams();


  getToken(authBody:AuthBody):Observable<any>{
     return this.http.post(this.apiUrl+"/authenticate",JSON.stringify(authBody),this.httpOptions).pipe(retry(1),catchError(this.handleError));
  }

   
   createUser(user:User):Observable<User>{
      return this.http.post<User>(this.apiUrl+"/user",JSON.stringify(user),this.httpOptions).pipe(retry(1),catchError(this.handleError));   
   }

   fileUplaod(formdata:FormData):Observable<any>{
     return  this.http.post(this.apiUrl+"/demo/upload",formdata, {responseType: 'text'}).pipe(retry(1),catchError(this.handleError));
   }

   getUserById(id:string):Observable<any>{
    return this.http.get(this.apiUrl+`/user/${id}`).pipe(retry(1),catchError(this.handleError));
   }

   updateUser(user:User,id:number):Observable<User>{
    return this.http.put<User>(this.apiUrl+`/user/${id}`,JSON.stringify(user),this.httpOptions).pipe(retry(1),catchError(this.handleError));   
 }

 deleteUser(id:number):Observable<any>{
  return this.http.delete(this.apiUrl+`/user/${id}`, {responseType: 'text'}).pipe(catchError(this.handleError));   
}

   getAllUsers(pageNo:string):Observable<any>{
     //this.httpParam.append("pageNo",pageNo);
     return this.http.get(this.apiUrl+"/user/all",{params:  {pageNo: pageNo}}).pipe(retry(1),catchError(this.handleError));
   }

   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  //  window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
