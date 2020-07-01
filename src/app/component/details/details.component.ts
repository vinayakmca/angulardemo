import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  submiited:boolean=false;
  @Input() userDetails;
  @Output() updateCity=new EventEmitter();
  constructor(private formFb:FormBuilder) { }

  cityForm=this.formFb.group({
   
    city:['',Validators.required],
    
});

  ngOnInit() {
  }

  get f(){
    return this.cityForm.controls;
  }

  changeCity(){
    this.submiited=true;

    if(this.cityForm.valid){
      console.log("city name is "+this.f.city.value)
      this.userDetails.city=this.f.city.value;
      this.updateCity.emit(this.userDetails);
    }
   
  }
}
