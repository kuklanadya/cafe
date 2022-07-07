import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})

export class ClientsFormComponent implements OnInit {
  public item: any = [];
  id!: string;
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private crudService: ClientsService
  ) { }

  ngOnInit(): void {
    this.subscribeRouteParams();
    this.initForm();
  }

  subscribeRouteParams() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.id = params['id'];
        this.getById();
      });
  }

  getById() {
    this.crudService.getById(this.id)
      .subscribe((res) => {
        this.item = res;
        this.patchForm();
      });
  }

  initForm() {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      taste: [''],
    });
  }

  patchForm() {
    this.clientForm.patchValue({
      name: [this.item?.name],
      age: [this.item?.age],
      taste: [this.item?.taste],
    })
  }

  formSubmitted(value: any) {
    this.id ? this.updateData(this.id, value) : this.createData(value);
  }

  createData(value: any) {
    this.crudService.create(value);
    alert('Data sent!');
  }

  updateData(id: string, value: any) {
    this.crudService.update(id, value);
    alert('Data updated!');
  }

  goBack() {
    this.location.back();
  }
}
