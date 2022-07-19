import { DbEntity } from "../shared/db-entity.model";
import { Dish } from "./dish.model";

export class Order extends DbEntity {
    client: string;
    orderItemsCount?: number;
    orderItems: string[];
    sum: number;

    constructor(client: string, orderItems: string[], menu: Array<Dish>) {
        super();
        this.client = client;
        this.orderItemsCount = orderItems.length;
        this.orderItems = orderItems;
        this.sum = this.getSum(orderItems, menu);
    }

    getSum(orderItems: string[], menu: Array<Dish>) {
        let sum = 0;
        for (let i = 0; i < orderItems.length; i++) {
            for (let el of menu) {
                if (el.name === orderItems[i]) {
                    sum += el.price;
                }
            }
        }
        return sum;
    }
}