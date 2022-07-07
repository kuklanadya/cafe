import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishesRoutingModule } from './dishes-routing.module';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { RouterModule } from '@angular/router';
import { AddIconPipe } from '../pipes/add-icon.pipe';

@NgModule({
  declarations: [
    DishesListComponent,
    AddIconPipe,
  ],
  imports: [
    CommonModule,
    DishesRoutingModule,
    RouterModule
  ]
})

export class DishesModule { }
