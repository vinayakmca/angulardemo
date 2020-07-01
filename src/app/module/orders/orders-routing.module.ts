import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from 'src/app/component/order/order.component';
import {ProductformComponent} from 'src/app/component/productform/productform.component';

const routes: Routes = [
  {
    path: '', component: OrderComponent,
  },
  {
    path: 'product', component: ProductformComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
