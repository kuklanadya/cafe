import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})

export class ClientsFormComponent implements OnInit {
  item: any = [];
  id!: string;
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private crudService: ClientsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subscribeRouteParams();
    this.initForm();
  }

  private subscribeRouteParams() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.getById();
      });
  }

  private initForm() {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      taste: [''],
    });
  }

  private getById() {
    this.crudService.getById(this.id)
      .subscribe((res: any) => {
        this.item = res;
        this.patchForm();
      });
  }

  private patchForm() {
    this.clientForm.patchValue({
      name: [this.item?.name],
      age: [this.item?.age],
      taste: [this.item?.taste],
    })
  }

  public formSubmitted(value: any) {
    this.id ? this.updateData(this.id, value) : this.createData(value);
  }

  private createData(value: any) {
    this.crudService.create(value).then(() => this.openSnackBar('Success! Client was created'), () => this.openSnackBar('Error'));
    this.goBack();
  }

  private updateData(id: string, value: any) {
    this.crudService.update(id, value).then(() => this.openSnackBar('Success! Client`s data updated'), () => this.openSnackBar('Error'));
    this.goBack();
  }

  private openSnackBar(value: string) {
    this.snackBar.open(value, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public goBack() {
    this.location.back();
  }
}
