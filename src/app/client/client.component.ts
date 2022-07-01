import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, query, where } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientId!: string;

  constructor(public firestore: Firestore, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params) => {
        this.clientId = params['clientId'];
        console.log(this.clientId)
      });

    // const clientInstanse = collection(this.firestore, 'clients');
    // const docsRef = query(clientInstanse, where('id', '==', this.clientId));
    // let result = collectionData(docsRef, { idField: 'id' })
    //   .pipe(map((lists: any[]) => {
    //     return lists.length ? lists[0] : null;
    //   }));
    // console.log(result)
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'clients', id);
    deleteDoc(dataToDelete)
      .then(() => {
        alert('Data deleted!')
      })
      .catch((err) => alert(err.message));
  }
}
