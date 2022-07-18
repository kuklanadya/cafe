import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientsService } from '../shared/services/clients.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {
  item: any = [];
  clientNote: string = '';
  id!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private crudService: ClientsService,
    public dialog: Dialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
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
        this.cdr.detectChanges();
      });
  }

  deleteData(id: string) {
    this.crudService.delete(id);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open<string>(DeleteModalComponent, {
      width: '250px',
      data: {
        name: this.item.name,
      }
    });

    dialogRef.closed.subscribe(result => {
      if (result == 'confirm') {
        this.deleteData(id);
        this.openSnackBar('Success! Data deleted');
      }
      else {
        this.openSnackBar('Oops! Deletion canceled');
      }
    });
  }

  openSnackBar(value: string) {
    this.snackBar.open(value, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onNoteChanged(note: any) {
    this.clientNote = note;
  }
}