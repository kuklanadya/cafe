import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishesService } from 'src/app/shared/services/dishes.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})

export class OrdersFormComponent implements OnInit {
  order: any = [];
  dishes: any = [];
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

  constructor(
    private fb: FormBuilder,
    private dishesCrudService: DishesService,
    private ordersCrudService: OrdersService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    this.readData();
  }

  public handleAddClick() {
    this.addPosition();
    this.countSum();
  }

  private addPosition() {
    if (!this.order.find((item: any) => item.position == this.selectedPosition)) {
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

  private countSum() {
    for (let i = 0; i < this.order.length; i++) {
      for (let item of this.dishes) {
        if (item.name === this.order[i].position) {
          this.sum += item.price;
        }
      }
    }
  }

  private initForm() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      order: [this.order],
      place: ['', Validators.required],
      discount: [''],
      payment: ['', Validators.required],
      review: [''],
    });
  }

  public formSubmitted(value: any) {
    let datePipe = new DatePipe('en-US');
    value.birthday = datePipe.transform(value.birthday, 'MM/dd/yyyy');
    this.ordersCrudService.create(value).then(() => this.openSnackBar('Success! Your order was accepted'),
      () => this.openSnackBar('Error'));
  }

  private readData() {
    this.dishesCrudService.read().subscribe((dishes: any) => {
      this.dishes = dishes;
    });
  }

  private openSnackBar(value: string) {
    this.snackBar.open(value, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
