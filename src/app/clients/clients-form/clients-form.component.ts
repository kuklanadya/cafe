import { Component, OnInit } from '@angular/core';
import { firebaseAppFactory } from '@angular/fire/app/app.module';
import { addDoc, updateDoc, doc, getDocs, deleteDoc, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})

export class ClientsFormComponent implements OnInit {
  public item: any;
  clientId!: string;
  clientForm!: FormGroup;

  constructor(
    public firestore: Firestore,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params) => {
        this.clientId = params['clientId'];
      });

    this.initForm();
  }

  initForm() {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      taste: [''],
    });
  }

  formSubmitted(value: any) {
    console.log(this.clientForm);
    this.clientId ? this.updateData(this.clientId, value) : this.createData(value);
  }

  createData(value: any) {
    const clientInstanse = collection(this.firestore, 'clients');
    addDoc(clientInstanse, value)
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
}
