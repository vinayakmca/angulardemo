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
//import { DetailsComponent } from './component/details/details.component';
import { LoginComponent } from './component/login/login.component';
import {UserModule} from './component/user/user/user.module';
import {OrdersModule} from './module/orders/orders.module';
import { UserComponent } from './component/user/user.component';
import { HeaderComponent } from './component/header/header.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import {ReverseStr} from '../app/pipe/resverstr.pipe'
import {uselessPipe} from '../app/pipe/nameChanged.pipe';
import {changeColor} from '../app/directive/chnageColor.directive';


@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    ProfileComponent,
    PageNotFoundComponent,
    MymodalcomponentComponent,
    LoginComponent,
    HeaderComponent,
    ReverseStr,
    uselessPipe,
    changeColor
    //DetailsComponent,
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
    OrdersModule,
    ToastrModule.forRoot(),
    CalendarModule
   
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
