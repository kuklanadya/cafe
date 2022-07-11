import { Component, OnInit } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { collection, query } from 'firebase/firestore';
import { map } from 'rxjs';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})

export class ClientsListComponent implements OnInit {
  public data: any = [];

  constructor(private crudService: ClientsService) {
  }

  ngOnInit(): void {
    this.readData();
  }

  readData() {
    this.crudService.read().subscribe((res: any) => {
      this.data = res;
    });
  }
}