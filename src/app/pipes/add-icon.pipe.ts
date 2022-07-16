import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addIcon'
})

export class AddIconPipe implements PipeTransform {

  transform(type: string): unknown {
    const flag = this.getDish(type as DishType);
    return `${type} ${flag}`;
  }

  getDish(type: DishType) {
    switch (type) {
      case DishType.firstCourse: {
        return '🍕'
      }
      case DishType.secondCourse: {
        return '🥞'
      }
      case DishType.snack: {
        return '🥪'
      }
      case DishType.dessert: {
        return '🍨'
      }
      case DishType.drink: {
        return '🍷'
      }
      default: {
        return ''
      }
    }
  }
}

export enum DishType {
  firstCourse = "first course",
  secondCourse = "second course",
  snack = 'snack',
  dessert = 'dessert',
  drink = 'drink'
}