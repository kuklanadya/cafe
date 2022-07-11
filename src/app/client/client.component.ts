import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientsService } from '../shared/services/clients.service';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

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
    private crudService: ClientsService,
    public dialog: Dialog
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

  openModal(id: string): void {
    const dialogRef = this.dialog.open<string>(deleteDataModal, {
      width: '250px',
    });

    dialogRef.closed.subscribe(result => {
      if (result == 'confirm') this.deleteData(id);
    });

  }
}

@Component({
  selector: 'delete-data-modal',
  template: `
  <h2>Are you sure?</h2>
  <div>
    <button (click)="dialogRef.close('confirm')">Confirm</button>
    <button (click)="dialogRef.close()">Cancel</button>
  </div>
  `,
  styles: [`
  :host { 
    display: block;
    background: #fff;
    border-radius: 8px;
    padding: 8px 16px 16px;
  }
  input {
    margin: 8px 0;
  }
  button {
    cursor: pointer;
    height: 30px;
    width: 100px;
    background-color: #d3cedf;
    border: none;
    border-radius: 15px;
    margin-top: 10px;
    &:hover {
        background-color: #bab1cd;
    }
  }
  button + button {
    margin-left: 8px;
  } 
  `],
})

export class deleteDataModal {
  constructor(public dialogRef: DialogRef<string>) { }
}