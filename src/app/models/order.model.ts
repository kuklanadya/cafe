import { Dish } from "./dish.model";

export class Order {
    client: string;
    orderItemsCount?: number;
    orderItems: string[];
    sum: number;

    constructor(client: string, orderItems: string[], menu: Array<Dish>) {
        this.client = client;
        this.orderItemsCount = orderItems.length;
        this.orderItems = orderItems;
        this.sum = 0;

        for (let i = 0; i < orderItems.length; i++) {
            for (let el of menu) {
                if (el.name === orderItems[i]) {
                    this.sum += el.price;
                }
            }
        }
    }
}