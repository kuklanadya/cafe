import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { ClientComponent } from './client/client.component';
import { ClientNoteComponent } from './client/client-note/client-note.component';
import { DeleteModalComponent } from './client/delete-modal/delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [
    ClientsFormComponent,
    ClientsListComponent,
    ClientComponent,
    ClientNoteComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
