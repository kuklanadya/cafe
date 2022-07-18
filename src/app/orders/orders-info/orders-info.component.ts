import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss']
})
export class OrdersInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
