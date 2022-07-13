import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    DialogModule,
    MatSnackBarModule,
  ]
})

export class ClientModule { }
