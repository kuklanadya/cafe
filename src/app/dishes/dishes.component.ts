import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dishes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
