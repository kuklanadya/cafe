import { DbEntity } from "../shared/db-entity.model";
import { Dish } from "./dish.model";
import { Order } from "./order.model";

export class Client extends DbEntity {
    name: string;
    age: number;
    taste?: TasteType;

    constructor(name: string, age: number, taste: TasteType) {
        super()
        this.name = name;
        this.age = age;
        this.taste = taste || TasteType.common;
        console.log(`Welcome, ${name}!`);
    }

    makeOrder(dishes: any[], menu: Array<Dish>) {
        console.log(`${this.name}, your order is accepted!`);
        return new Order(this.name, dishes, menu);
    }

    getOrder(order: Order) {
        console.log(`Your order is ready! It consists of ${order.orderItemsCount}: ${order.orderItems.join(', ')}. Total order amount = ${order.sum}. Bon appetit!`);
    }
}

export enum TasteType {
    spicy,
    bitter,
    sweet,
    salty,
    sour,
    common
}
