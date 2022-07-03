import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, query, where } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public item: any = [];
  clientId!: string;

  constructor(public firestore: Firestore, private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params) => {
        this.clientId = params['clientId'];
      });

    this.findClient();
  }

  findClient() {
    const clientInstanse = collection(this.firestore, 'clients');
    const clientRef = query(clientInstanse); //where('id', '==', this.clientId)
    collectionData(clientRef, { idField: 'id' })
      .pipe(map((lists: any[]) => lists.length ? lists : null))
      .subscribe((res) => {
        this.item = res?.find((item: any) => item['id'] == this.clientId);
      });
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'clients', id);
    deleteDoc(dataToDelete)
      .then(() => {
        alert('Data deleted!')
      })
      .catch((err) => alert(err.message));
  }

  goBack() {
    this.location.back();
  }
}
