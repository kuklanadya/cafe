import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
