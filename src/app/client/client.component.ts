import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientsService } from '../shared/services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {
  public item: any = [];
  id!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private crudService: ClientsService
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

  deleteData(id: string) {
    this.crudService.delete(id);
    alert('Data deleted!')
    this.goBack();
  }

  goBack() {
    this.location.back();
  }
}