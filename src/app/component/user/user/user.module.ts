import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from '../user.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { DetailsComponent } from '../../details/details.component';

@NgModule({
  declarations: [
    DetailsComponent,
    UserComponent,
    UserListComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
  ]
})
export class UserModule { }
