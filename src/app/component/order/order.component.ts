import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/Order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  productList:any=[];
  order:Order=new Order();
  public minDate: Date = new Date ("05/07/2017");
  public maxDate: Date = new Date ("08/27/2021");
  public value: Date = new Date ("05/29/2020");

  constructor(private orderService:OrderService,private toastr: ToastrService) { }

  ngOnInit() {
    this.orderService.getAllProducts().subscribe((res)=>{this.productList=res});
  }

  addProductIntoList(data:any){
    
     let index=this.order.products.findIndex(obj=>obj.productId===data.productId);
       if(index<0)
       {
        this.order.products.push(data);
       }
      this.order.total= this.order.products.map(e=>e.subTotal).reduce((a,b)=>(a+b));
      console.log("order "+JSON.stringify(this.order));  
  }

 onValueChange(data){
   console.log("calaned data "+data.value.toLocaleDateString());
 }

  completeOrder(){
    this.order.userId="1";
    this.order.status="complete";
    console.log("products item"+this.order);
    this.orderService.addOrder(this.order).subscribe((data)=>{ this.toastr.success(data.response)},(err)=>{this.toastr.error("somethng went wrong")});
  }

}
