import { Component, OnInit, ViewChild } from '@angular/core';
import { DishesService } from 'src/app/shared/services/dishes.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})

export class DishesListComponent implements OnInit {
  public data: any = [];
  dataSource!: MatTableDataSource<any>;
  collectionName: string = 'dishes';
  displayedColumns: string[] = ['name', 'price', 'type', 'taste', 'ingredients'];
  order!: string;
  filter!: string;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private crudService: DishesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.readData();
  }

  createTable(res: any): void {
    this.data = res;
    this.dataSource = new MatTableDataSource(res);
    this.setSort();
  }

  setSort(): void {
    let params = this.activatedRoute.snapshot.queryParams;
    if (params && params['direction'] != 'none') {
      this.sort.sort(({ id: params['sort'], direction: params['direction'] }) as any)
      this.dataSource.sort = this.sort;
      return;
    }
    this.dataSource.sort = this.sort;
    this.dataSource.sort.sortChange.subscribe((sortChange: Sort) => {
      this.changeSortUrl(sortChange)
    });
  }

  changeSortUrl(sortChange: any) {
    const sortQueryParams = {
      sort: sortChange.active,
      direction: sortChange.direction || 'none',
    };
    this.router.navigate([], {
      queryParams: sortQueryParams,
      queryParamsHandling: 'merge'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  readData() {
    this.crudService.read().subscribe((res: any) => {
      this.createTable(res);
    });
  }
}
