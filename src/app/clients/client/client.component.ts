import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-client',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {
  client: any = [];
  clientNote: string = '';
  id!: string;

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

  private subscribeRouteParams() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.getbyId();
      });
  }

  private getbyId() {
    this.crudService.getById(this.id)
      .subscribe((clientInfo) => {
        this.client = clientInfo;
        this.cdr.detectChanges();
      });
  }

  private deleteData(id: string) {
    this.crudService.delete(id).then(() => this.openSnackBar('Success! Data deleted'),
      () => this.openSnackBar('Error'));
    this.goBack();
  }

  public goBack() {
    this.location.back();
  }

  public openDialog(id: string): void {
    const dialogRef = this.dialog.open<string>(DeleteModalComponent, {
      width: '250px',
      data: {
        name: this.client.name,
      }
    });

    dialogRef.closed.subscribe((reply: string | undefined) => {
      if (reply == 'confirm') {
        this.deleteData(id)
      }
      else {
        this.openSnackBar('Oops! Deletion canceled');
      }
    });
  }

  private openSnackBar(value: string) {
    this.snackBar.open(value, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public onNoteChanged(note: any) {
    this.clientNote = note;
  }
}