import { Component, OnInit, Input } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  
  @Input() message;
  constructor() { }

 

  ngOnInit() {
    console.log("message"+this.message);
  }

  displayUpdatedMessage(event){
    console.log("event called"+event);
    this.message=event;
  }

  updateChildMessage(){
    this.message="from parane";
  }

}
