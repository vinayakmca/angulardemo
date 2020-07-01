import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';
import {User} from '../model/user';
import { Observable,throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AuthBody } from '../model/AuthBody';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   apiUrl:string="http://localhost:8585/baeldung";
   isUserLoggedIn=new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http:HttpClient,private router:Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  

  httpParam=new HttpParams();


  getToken(authBody:AuthBody):Observable<any>{
     return this.http.post(this.apiUrl+"/authenticate",JSON.stringify(authBody),this.httpOptions).pipe(retry(1),catchError(this.handleError));
  }

  downloadPdfFileFromLink(){
   const  headers1 = new HttpHeaders();
  //  headers1.append('Access-Control-Allow-Origin', '*');
    headers1.append('responseType','blob' as 'blob');
    return this.http.get('http://www.champak.in/wp-content/emag/2020/mar-02-2020.pdf',{headers : headers1}).pipe(map((data:any)=>(res) => {
      return new Blob([res.blob()], { type: 'application/pdf' })
  }));
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

   private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn() : Observable<boolean> {
    return this.isUserLoggedIn.asObservable();
   }

  public login(authBody:AuthBody){
    this.getToken(authBody).subscribe((data)=>{ localStorage.setItem("token",data.response.token);localStorage.setItem("userId",data.response.userId);this.isUserLoggedIn.next(true);this.router.navigate(['/user']);} ,(error:any)=>{  console.log("errror message"+error)});


        //console.log("form submitted"+JSON.stringify(this.loginForm.value));
  }

  public setUserLoginButtonValue(data:boolean){
    this.isUserLoggedIn.next(data);
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
