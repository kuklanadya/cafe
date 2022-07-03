import { Component, OnInit } from '@angular/core';
import { addDoc, updateDoc, doc, query, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})

export class ClientsFormComponent implements OnInit {
  public item: any = [];
  clientId!: string;
  clientForm!: FormGroup;

  constructor(public firestore: Firestore, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params) => {
        this.clientId = params['clientId'];
      });

    this.findClient();
    this.initForm();
  }

  findClient() {
    const clientInstanse = collection(this.firestore, 'clients');
    const clientRef = query(clientInstanse); //where('id', '==', this.clientId)
    collectionData(clientRef, { idField: 'id' })
      .pipe(map((lists: any[]) => lists.length ? lists : null))
      .subscribe((res) => {
        this.item = res?.find((item: any) => item['id'] == this.clientId);
      });
  }

  //НЕ РАБОТАЕТ ЗАПОЛНЕНИЕ ПОЛЕЙ ФОРМЫ
  initForm() {
    this.clientForm = this.fb.group({
      name: [this.item?.name, Validators.required],
      age: [this.item?.age, Validators.required],
      taste: [this.item?.taste],
    });
  }

  formSubmitted(value: any) {
    console.log(this.clientForm);
    this.clientId ? this.updateData(this.clientId, value) : this.createData(value);
  }

  createData(value: any) {
    const clientInstanse = collection(this.firestore, 'clients');
    addDoc(clientInstanse, {
      name: value.name, age: value.age, taste: value.taste || 'common'
    })
      .then(() => alert('Data sent!'))
      .catch((err) => alert(err.message));
  }

  updateData(id: string, value: any) {
    const dataToUpdate = doc(this.firestore, 'clients', id);
    updateDoc(dataToUpdate, {
      name: value.name, age: value.age, taste: value.taste || 'common'
    })
      .then(() => {
        alert('Data updated!')
      })
      .catch((err) => alert(err.message));
  }

  goBack() {
    this.location.back();
  }
}
