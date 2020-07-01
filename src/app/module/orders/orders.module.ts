import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderComponent } from '../../component/order/order.component';
import {ProductComponent} from '../../component/product/product.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { ProductformComponent } from '../../component/productform/productform.component';

@NgModule({
  declarations: [OrderComponent,ProductComponent, ProductformComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CalendarModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
