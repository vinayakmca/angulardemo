import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './component/login/login.component';
import { DetailsComponent } from './component/details/details.component';

//import { UserListComponent } from './component/user/user-list/user-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'user', pathMatch: 'full'},
    { path: 'user', canActivate:[AuthGuardService],
    loadChildren: () => import('./component/user/user/user.module').then(m => m.UserModule) 
  
   
  },
  { path: 'order', canActivate:[AuthGuardService],
  loadChildren: () => import('./module/orders/orders.module').then(m => m.OrdersModule) 

 
},
    { path: 'profile',canActivate:[AuthGuardService], pathMatch: 'full', component: ProfileComponent},
    { path: 'login', pathMatch: 'full', component: LoginComponent},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
