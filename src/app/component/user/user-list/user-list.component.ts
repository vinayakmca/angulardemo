import { Component, OnInit, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {UserService} from '../../../service/user.service';
import { AuthBody } from '../../../model/AuthBody';
import { ToastrService } from 'ngx-toastr';
import {UserComponent} from '../user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  fileData:File=null;
  public  authObj:AuthBody=new AuthBody();
 userList:any=[];
 maxpa=1;
 resp:any={};
 isUpdate:boolean=false;
 curruntPage:number=1;
 private _destroyed$:Subject<boolean> = new Subject<boolean>();
 postsPerPage: number[] = [25, 50, 100];
 currentDialog = null;
  constructor(private http:HttpClient,private userService:UserService,private router:Router,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private dialog: MatDialog,private modalService: NgbModal) { }

  ngOnInit() {
    this.ngxService.start();
    this.getAllUsers(1);
    this.ngxService.stop();
  }

  getAllUsers(pageNo){
    this.userService.getAllUsers(pageNo).subscribe((data)=>{this.userList=data.content;this.curruntPage=data.number+1;this.maxpa=data.totalPages;}, error=>console.log(error));
   }
 
   getNextPage(event){
     this.getAllUsers(event.page);
   }
 
   editUser(id){
  console.log("user id"+id);
    this.userService.getUserById(id).subscribe(res=>{   const dialogRef = this.dialog.open(UserComponent, {
      width: '900px',
      data: {id:id,firstName:res.firstName,lastName:res.lastName,city:res.city}
    })});
 
    this.router.navigate(['/user/edit/', id]);
  }

 
   deleteUser(id,page){
     console.log(" delete user id ="+page);
     this.userService.deleteUser(id).subscribe(res=>{this.toastr.success(res)},error=>{alert("not able to delete record");},()=>this.getAllUsers(page));
    // console.log("currunt page no"+this.curruntPage);
     
   }

}
