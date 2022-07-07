import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DishComponent } from 'src/app/dish/dish.component';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class DishesService extends CrudService<DishComponent>{
  collectionName = 'dishes';

  constructor(public override firestore: Firestore) {
    super(firestore)
  }
}