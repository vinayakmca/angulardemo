import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './component/parent/parent.component';
import { ChildComponent } from './component/child/child.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MymodalcomponentComponent } from './mymodalcomponent/mymodalcomponent.component';
import { CustomHeaderInterceptor } from './interceptor/customheaderInterceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoginComponent } from './component/login/login.component';
import {UserModule} from './component/user/user/user.module';
import { UserComponent } from './component/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    ProfileComponent,
    PageNotFoundComponent,
    MymodalcomponentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxUiLoaderModule,
    MaterialModule,
    UserModule,
    ToastrModule.forRoot()
   
  ],
 
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: CustomHeaderInterceptor, multi: true },
     
  ],
  ],
  entryComponents:[
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
