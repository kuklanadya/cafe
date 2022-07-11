import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/shared/services/dishes.service';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})

export class DishesListComponent implements OnInit {
  public data: any = [];
  collectionName: string = 'dishes';

  constructor(private crudService: DishesService) { }

  ngOnInit(): void {
    this.readData();
  }

  readData() {
    this.crudService.read().subscribe((res: any) => {
      this.data = res;
    });
  }
}
