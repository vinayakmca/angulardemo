import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl:string="http://localhost:8585/baeldung";
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getAllProducts():Observable<any>{
    //this.httpParam.append("pageNo",pageNo);
    return this.http.get(this.apiUrl+"/product/all").pipe(retry(1),catchError(this.handleError));
  }

  addOrder(order:Order):Observable<any>{
      return this.http.post(this.apiUrl+"/order",JSON.stringify(order),this.httpOptions).pipe(retry(1),catchError(this.handleError));
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
