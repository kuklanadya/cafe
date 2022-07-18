import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishesService } from '../shared/services/dishes.service';

@Component({
  selector: 'app-dish',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})

export class DishComponent implements OnInit {
  item: any = [];
  id!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private crudService: DishesService
  ) { }

  ngOnInit(): void {
    this.subscribeRouteParams();
  }
  subscribeRouteParams() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.id = params['id'];
        this.getbyId();
      });
  }

  getbyId() {
    this.crudService.getById(this.id)
      .subscribe((res) => {
        this.item = res;
      });
  }

  goBack() {
    this.location.back();
  }
}
