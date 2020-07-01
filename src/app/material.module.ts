import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MAT_DIALOG_DATA ,MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@NgModule({
  exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class MaterialModule {}