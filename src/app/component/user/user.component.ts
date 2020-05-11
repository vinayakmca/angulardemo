import { Component, OnInit, Inject ,OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import {UserService} from '../../service/user.service';
import { User } from 'src/app/model/user';
import { Subject, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {

 fileData:File=null;
 private user:User=new User();
 userList:any=[];
 maxpa=1;
 resp:any={};
 isUpdate:boolean=false;
 curruntPage:number=1;
 private _destroyed$:Subject<boolean> = new Subject<boolean>();
 postsPerPage: number[] = [25, 50, 100];
 isHide:boolean=false;
 myVariable: Subscription;
  constructor(private formFb:FormBuilder,private http:HttpClient,public userService:UserService,private route: ActivatedRoute,private router:Router,private toastr: ToastrService,public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {
       this.router.routeReuseStrategy.shouldReuseRoute=()=>{return false}
   }

  userForm=this.formFb.group({
        id:[''],
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        city:['',Validators.required],
        image:['']
  });

  

  ngOnInit() {
   console.log("data "+JSON.stringify(this.data));
  // this.myVariable= this.route.params.subscribe(param=>{ this.editUser(param.id); this.isHide=false;})
   //this.myVariable=
   if(this.data!==null){
    this.editUser(this.data.id); this.isHide=false;
   }
   
  }

  

  

   ngOnDestroy(){
     this._destroyed$.next(true)
     this._destroyed$.unsubscribe();
    // this.myVariable.unsubscribe();
   }

  close(){
    this.dialogRef.close();
  }

  get f(){
    return this.userForm.controls;
  }

  getAllUsers(pageNo){
   this.userService.getAllUsers(pageNo).subscribe((data)=>{this.userList=data.content;this.curruntPage=data.number+1;this.maxpa=data.totalPages;}, error=>console.log(error));
  }

  getNextPage(event){
    this.getAllUsers(event.page);
  }

  editUser(id){
    console.log(" user id ="+id);
    this.userService.getUserById(id).subscribe(res=>{ this.userForm.patchValue({id:id,firstName:res.firstName,lastName:res.lastName,city:res.city})});
    this.isUpdate=true;
  }

  deleteUser(id,page){
    console.log(" delete user id ="+page);
    this.userService.deleteUser(id).subscribe(res=>{this.toastr.success("record deleted sucesfully"+res)},error=>{alert("not able to delete record");},()=>this.getAllUsers(page));
   // console.log("currunt page no"+this.curruntPage);
    
  }

  imageUpload(event){
    console.log("image data"+JSON.stringify(event));
    this.fileData = <File>event.target.files[0];
   
    const formdata=new FormData();
    formdata.append("file",this.fileData);
    this.userService.fileUplaod(formdata).subscribe((res:any) => {
      console.log(JSON.stringify(res));
      alert('SUCCESS !!');})
  
  }

  submitForm(page){
    
   //  formdata.append("file",)
   this.user=<User>this.userForm.value;
   
    if(this.isUpdate){
      this.userService.updateUser(this.user,this.user.id).subscribe((data:{})=>{ this.toastr.success('record updated');this.router.navigate(['/user']);this.dialogRef.close();},error=>{alert('not able to update user');},()=> {this.getAllUsers(page);this.isHide=true;});
    }
    else
    {
      this.userService.createUser(this.user).subscribe((data:{})=>{ this.toastr.success('record submiited');this.router.navigate(['/user']);},error=>{alert('not able to create user');},()=> {this.getAllUsers(1);this.isHide=true;});
     
    }

    this.userForm.reset();
    this.isUpdate=false;

  }

}
