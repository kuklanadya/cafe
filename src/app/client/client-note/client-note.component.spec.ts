import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNoteComponent } from './client-note.component';

describe('ClientNoteComponent', () => {
  let component: ClientNoteComponent;
  let fixture: ComponentFixture<ClientNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
