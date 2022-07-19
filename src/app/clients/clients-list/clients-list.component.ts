import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-clients-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})

export class ClientsListComponent implements OnInit {
  data: any = [];

  constructor(
    private crudService: ClientsService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.readData();
  }

  private readData() {
    this.crudService.read().subscribe((res: any) => {
      this.data = res;
      this.cdr.detectChanges();
    });
  }
}
