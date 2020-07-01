import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrderItem } from 'src/app/model/OrderItem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  orderItem:OrderItem=new OrderItem();
  @Input() product;
  @Output() addProductEvent=new EventEmitter();
  quantity:number=0;
  constructor(private toastr: ToastrService) { }

  ngOnInit() {
   
  }

  addQuantity(){
    this.quantity+=1;
  }

  removeQuantity(){
    if(this.quantity>0){
    this.quantity-=1;
    }
  }

  addProduct(){
    console.log("product id"+this.product.id);
    this.orderItem.productId=this.product.id;
    this.orderItem.quantity=this.quantity;
    this.orderItem.subTotal=this.quantity*this.product.productPrice;
    this.addProductEvent.emit(this.orderItem);
    this.toastr.success("Product added");
  }

}
