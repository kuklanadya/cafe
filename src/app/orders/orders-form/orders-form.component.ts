import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishesService } from 'src/app/shared/services/dishes.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})

export class OrdersFormComponent implements OnInit {
  public order: any = [];
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
    if (!this.order.find((item: any) => item.position == this.selectedPosition)) {
      console.log(!this.order.find((item: any) => item.position == this.selectedPosition))
      this.order.push({
        position: this.selectedPosition,
        quantity: this.quantity
      })
    }
    else {
      for (let item of this.order) {
        if (item.position == this.selectedPosition) {
          item.quantity += this.quantity;
        }
      }
    }

    this.selectedPosition = '';
    this.quantity = 1;
  }

  countSum() {
    for (let i = 0; i < this.order.length; i++) {
      for (let item of this.dishes) {
        if (item.name === this.order[i].position) {
          this.sum += item.price;
        }
      }
    }
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
