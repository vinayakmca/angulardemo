import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() childmessage;
  @Output() passMessageEvent=new EventEmitter();
  constructor() { }

  passMessage(){
    this.childmessage="new child";
    this.passMessageEvent.emit(this.childmessage);
  }

  ngOnInit() {
  }

}
