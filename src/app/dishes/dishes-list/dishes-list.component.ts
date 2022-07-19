import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { DishesService } from 'src/app/shared/services/dishes.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';

@Component({
  selector: 'app-dishes-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})

export class DishesListComponent implements OnInit {
  data: any = [];
  filterInput!: string;
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
    const params: { sort?: string, direction?: string, filter?: string, } = this.activatedRoute.snapshot.queryParams;
    if (params && params.direction != 'none') {
      this.sort.sort((
        {
          id: params.sort,
          direction: params.direction,
          start: params.direction
        }) as any)
    }
    this.dataSource.sort = this.sort;
    this.dataSource.sort.sortChange.subscribe((sortChange: Sort) => {
      this.changeSortUrl(sortChange)
    });
  }

  changeSortUrl(sortChange: any) {
    const sortQueryParams = {
      sort: sortChange.direction ? sortChange.active : null,
      direction: sortChange.direction || null,
    };
    this.router.navigate([], {
      queryParams: sortQueryParams,
      queryParamsHandling: 'merge'
    });
  }

  checkFilterParams() {
    const params: { sort?: string, direction?: string, filter?: string, } = this.activatedRoute.snapshot.queryParams;
    if (params.filter) {
      this.filterInput = params.filter;
      this.applyFilter();
    }
  }

  applyFilter() {
    const filterValue = this.filterInput;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.router.navigate([], {
      queryParams: {
        filter: filterValue || null,
      },
      queryParamsHandling: 'merge'
    });
  }

  readData() {
    this.crudService.read().subscribe((res: any) => {
      this.createTable(res);
      this.checkFilterParams();
    });
  }
}
