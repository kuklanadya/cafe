import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Dish } from 'src/app/models/dish.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class DishesService extends CrudService<Dish>{
  collectionName = 'dishes';

  constructor(protected override firestore: Firestore) {
    super(firestore)
  }
}