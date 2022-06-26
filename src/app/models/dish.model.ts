import { TasteType } from "./client.model";

export class Dish {
    name: string;
    ingredients: any[];
    price: number;
    taste: TasteType;
    type: DishType;

    constructor(name: string, ingredients: any[], price: number, taste: TasteType, type: DishType) {
        this.name = name;
        this.ingredients = ingredients;
        this.price = price;
        this.taste = taste;
        this.type = type;
    }
}

export enum DishType {
    "first course",
    "second course",
    snack,
    dessert,
    drink
}
