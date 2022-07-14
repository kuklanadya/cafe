import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientNoteComponent } from './client-note/client-note.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    DeleteModalComponent,
    // ClientNoteComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    DialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})

export class ClientModule { }
