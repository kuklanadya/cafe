import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})

export class DeleteModalComponent implements OnInit {

  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
