import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { UserComponent } from '../user.component';


const routes: Routes = [
  {
    path: '', component: UserListComponent,
  children: [
    {  path: 'edit/:id',   component:  UserComponent },
    {  path: 'add', component: UserComponent }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents:[
    UserComponent
  ],
})
export class UserRoutingModule { }
