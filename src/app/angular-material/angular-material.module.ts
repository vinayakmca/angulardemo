import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,CommonModule],
  exports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class AngularMaterialModule { }
