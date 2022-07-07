import { Component, OnInit } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { collection, Firestore, query } from 'firebase/firestore';
import { map } from 'rxjs';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})

export class ClientsListComponent implements OnInit {
  public data: any = [];

  constructor(
    private crudService: ClientsService
  ) {
    this.readData();
  }

  ngOnInit(): void {

  }

  readData() {
    // this.data = this.crudService.read();
    // console.log(this.data)

    // const clientInstanse = collection(this.firestore, 'clients');
    // const clientRef = query(clientInstanse);
    // console.log(clientRef)

  }
}
