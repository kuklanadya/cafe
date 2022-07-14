import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-client-note',
  templateUrl: './client-note.component.html',
  styleUrls: ['./client-note.component.scss']
})
export class ClientNoteComponent implements OnInit {
  public note: string = '';

  @Input() name: any;
  @Output() noteChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
