import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ClientsFormComponent,
    ClientsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule
  ]
})
export class ClientsModule { }
