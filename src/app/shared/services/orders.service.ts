import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Order } from 'src/app/models/order.model';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root'
})

export class OrdersService extends CrudService<Order>{
    collectionName = 'orders';

    constructor(protected override firestore: Firestore) {
        super(firestore)
    }
}