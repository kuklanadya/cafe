import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishesService } from 'src/app/shared/services/dishes.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})

export class OrdersFormComponent implements OnInit {
  public items: any = [];
  public dishes: any = [];
  orderForm!: FormGroup;
  sum: number = 0;

  selectedPosition!: string;
  quantity: number = 1;

  paymentMethods: any[] = [
    {
      value: 'cash',
      viewValue: 'With cash'
    },
    {
      value: 'terminal',
      viewValue: 'By card at the terminal'
    },
    {
      value: 'liqpay',
      viewValue: 'By card via Liqpay'
    },
    {
      value: 'pay24',
      viewValue: 'By card via Pay24'
    },
  ]

  positions: any[] = [
    {
      value: 'milkshake',
      viewValue: 'Milkshake'
    },
    {
      value: 'strawberry pancakes',
      viewValue: 'Strawberry Pancakes'
    },
    {
      value: 'croissant with chocolate',
      viewValue: 'Croissant With Chocolate'
    },
    {
      value: 'pizza 4 cheeses',
      viewValue: 'Pizza 4 Cheeses'
    },
    {
      value: 'fruit ice-cream',
      viewValue: 'Fruit Ice-cream'
    },
  ]

  constructor(private fb: FormBuilder, private crudService: DishesService) { }

  ngOnInit(): void {
    this.initForm();
    this.readData();
  }

  handleAddClick() {
    this.addPosition();
    this.countSum();
  }

  addPosition() {
    this.items.push({
      position: this.selectedPosition,
      quantity: this.quantity
    })
    this.selectedPosition = '';
    this.quantity = 1;
  }

  countSum() {

  }

  initForm() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      place: ['', Validators.required],
      discount: [''],
      payment: ['', Validators.required],
      review: [''],
    });
  }

  formSubmitted(value: any) {
    console.log(value);
  }

  readData() {
    this.crudService.read().subscribe((res: any) => {
      this.dishes = res;
    });
  }
}
