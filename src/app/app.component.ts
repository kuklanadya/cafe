import { Component } from '@angular/core';
import { Client, TasteType } from './models/client.model';
import { Dish, DishType } from './models/dish.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cafe';

  constructor() {
    let dish1 = new Dish("milkshake", ["milk", "ice-cream", "honey", "cinnamon", "vanilla"], 35, TasteType.sweet, DishType.drink);
    let dish2 = new Dish("strawberry pancakes", ["eggs", "flour", "milk", "honey", "strawberry", "syrup"], 45, TasteType.sweet, DishType["second course"]);
    let dish3 = new Dish("croissant with chocolate", ["eggs", "flour", "butter", "yeast", "chocolate", "salt"], 25, TasteType.bitter, DishType.snack);
    let dish4 = new Dish("pizza 4 cheeses", ["chiken", "mozzarella", "parmesan", "gouda", "dor blue", "sauce"], 120, TasteType.salty, DishType["first course"]);
    let dish5 = new Dish("fruit ice-cream", ["ice-cream", "banana", "peach", "strawberry", "grapes", "pineapple", "orange"], 40, TasteType.sweet, DishType.dessert);

    let menu = [dish1, dish2, dish3, dish4, dish5];

    let mira = new Client("Mira", 23, TasteType.bitter);
    let order1 = mira.makeOrder(["pizza 4 cheeses", "fruit ice-cream", "milkshake"], menu);
    mira.getOrder(order1);
  }
}
