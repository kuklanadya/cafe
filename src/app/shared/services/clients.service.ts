import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Client } from 'src/app/models/client.model';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root'
})

export class ClientsService extends CrudService<Client>{
    collectionName = 'clients';

    constructor(protected override firestore: Firestore) {
        super(firestore)
    }
}