import { Component, OnInit } from '@angular/core';
import { doc, getDocs, deleteDoc, Firestore, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})

export class ClientsListComponent implements OnInit {
  public data: any = [];

  constructor(public firestore: Firestore) {
    this.readData();
  }

  ngOnInit(): void {
  }

  readData() {
    const clientInstanse = collection(this.firestore, 'clients');

    getDocs(clientInstanse)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      });
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'clients', id);
    deleteDoc(dataToDelete)
      .then(() => {
        alert('Data deleted!')
        this.readData()
      })
      .catch((err) => alert(err.message));
  }

}
