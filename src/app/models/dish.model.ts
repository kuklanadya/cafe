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
    firstCourse = "first course",
    secondCourse = "second course",
    snack = 'snack',
    dessert = 'dessert',
    drink = 'drink'
}
