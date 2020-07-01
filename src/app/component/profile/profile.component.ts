import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormArray} from '@angular/forms';
import {Education} from '../../model/education';
import {Experiance} from '../../model/experiance';
import {UserService} from '../../service/user.service';
import { AuthBody } from '../../model/AuthBody';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm:FormGroup;
  submitted = false;
 // public  authObj:AuthBody=new AuthBody();
  constructor(private fb:FormBuilder) { }

  

 

  ngOnInit() {
    this.profileForm=this.fb.group({
      id:[''],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.email,Validators.required]],
      mobile:['',Validators.maxLength(10)],
      profilePicture:[''],
      education:this.fb.array([this.createEducationForm()]),
      experiance:this.fb.array([this.createExperianceForm()])
     });

   
  }

  get f(){
    return this.profileForm.controls;
  }

  createEducationForm():FormGroup{
    return this.fb.group({
      courseName:['',Validators.required],
  percentage:['',Validators.required],
  collegeName:['',Validators.required],
  passingYear:['',Validators.required],
  subjects:new FormArray([this.createSubForm()])
    });
}

createSubForm():FormGroup{
  return this.fb.group({subject:['',Validators.required]});
}

createExperianceForm():FormGroup{
  return this.fb.group({
    companyName:['',Validators.required],
  designation:['',Validators.required],
  fromDate:['',Validators.required],
  toDate:['',Validators.required],
  });
}



  get educationForm():FormArray{
      return this.profileForm.get('education') as FormArray;
  }

  get experianceForm():FormArray{
     return this.profileForm.get('experiance') as FormArray;
  }

  get subjectForm():FormArray{
  
    return  this.profileForm.get('education') as FormArray;
  }

  addEducation() {
    this.educationForm.push(this.createEducationForm());
  }

  deleteEducation(index) {
    this.educationForm.removeAt(index);
  }

  addExperiance() {
    this.experianceForm.push(this.createExperianceForm());
  }

  deleteExperiance(index) {
    this.experianceForm.removeAt(index);
  }


  getSubject(form){
      return  (<FormArray> form.controls.subjects).controls;
  }

  addSubject(i) {
    const control = <FormArray>  this.subjectForm.controls[i].get('subjects');
    control.push(this.createSubForm());
  }

  deleteSubject(index) {

    const control = <FormArray>  this.subjectForm.controls[index].get('subjects');
    control.removeAt(index);
   
  }

  submitForm(){
    this.submitted=true;
        console.log("form submitted"+JSON.stringify(this.profileForm.value));
  }


}
