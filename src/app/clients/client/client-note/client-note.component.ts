import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-client-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './client-note.component.html',
  styleUrls: ['./client-note.component.scss']
})

export class ClientNoteComponent implements OnInit {
  note: string = '';

  @Input() name!: string;
  @Output() noteChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
