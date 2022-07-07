import { Component, OnInit } from '@angular/core';
import { getDocs, Firestore, collection } from '@angular/fire/firestore';
import { DishesService } from 'src/app/shared/services/dishes.service';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})

export class DishesListComponent implements OnInit {
  public data: any = [];
  collectionName: string = 'dishes';

  constructor(
    public firestore: Firestore,
    private crudService: DishesService
  ) {
    this.readData();
  }

  ngOnInit(): void {
  }

  readData() {
    // this.data = this.crudService.read();
    // console.log(this.data)


    const clientInstanse = collection(this.firestore, this.collectionName);
    getDocs(clientInstanse)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      });

  }
}
