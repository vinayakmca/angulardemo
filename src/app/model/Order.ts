import { OrderItem } from './OrderItem';

export class Order{
    userId:string;
    total:number=0;
    status:string; 
    products:OrderItem[]=[];
}