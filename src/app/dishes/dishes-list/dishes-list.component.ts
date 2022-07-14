import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DishesService } from 'src/app/shared/services/dishes.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})

export class DishesListComponent implements AfterViewInit {
  public data: any = [];
  dataSource!: MatTableDataSource<any>;
  collectionName: string = 'dishes';
  displayedColumns: string[] = ['name', 'price', 'type', 'taste', 'ingredients'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private crudService: DishesService) { }

  ngAfterViewInit() {
    this.readData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  readData() {
    this.crudService.read().subscribe((res: any) => {
      this.data = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
  }
}
