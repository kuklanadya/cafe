import { isNgTemplate } from '@angular/compiler';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, updateDoc, doc, getDocs, deleteDoc, Firestore, collection } from '@angular/fire/firestore';
import { Client, TasteType } from './models/client.model';
import { Dish, DishType } from './models/dish.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cafe';
  public data: any = [];

  constructor(public auth: Auth, public firestore: Firestore) {
    let dish1 = new Dish("milkshake", ["milk", "ice-cream", "honey", "cinnamon", "vanilla"], 35, TasteType.sweet, DishType.drink);
    let dish2 = new Dish("strawberry pancakes", ["eggs", "flour", "milk", "honey", "strawberry", "syrup"], 45, TasteType.sweet, DishType["second course"]);
    let dish3 = new Dish("croissant with chocolate", ["eggs", "flour", "butter", "yeast", "chocolate", "salt"], 25, TasteType.bitter, DishType.snack);
    let dish4 = new Dish("pizza 4 cheeses", ["chiken", "mozzarella", "parmesan", "gouda", "dor blue", "sauce"], 120, TasteType.salty, DishType["first course"]);
    let dish5 = new Dish("fruit ice-cream", ["ice-cream", "banana", "peach", "strawberry", "grapes", "pineapple", "orange"], 40, TasteType.sweet, DishType.dessert);

    let menu = [dish1, dish2, dish3, dish4, dish5];

    let mira = new Client("Mira", 23, TasteType.bitter);
    let order1 = mira.makeOrder(["pizza 4 cheeses", "fruit ice-cream", "milkshake"], menu);
    mira.getOrder(order1);

    this.readData();
  }

  createData(value: any) {
    const clientInstanse = collection(this.firestore, 'clients');
    addDoc(clientInstanse, value)
      .then(() => alert('Data sent!'))
      .catch((err) => alert(err.message));
  }

  readData() {
    const clientInstanse = collection(this.firestore, 'clients');
    getDocs(clientInstanse)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      });
  }

  updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'clients', id);
    updateDoc(dataToUpdate, {
      age: 30,
    })
      .then(() => {
        alert('Data updated!')
        this.readData()
      })
      .catch((err) => alert(err.message));
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'clients', id);
    deleteDoc(dataToDelete)
      .then(() => {
        alert('Data deleted!')
        this.readData()
      })
      .catch((err) => alert(err.message));
  }

  // handleRegister(value: any) {
  //   createUserWithEmailAndPassword(this.auth, value.email, value.password)
  //     .then((response: any) => console.log(response.user))
  //     .catch((err) => alert(err.message));
  // }

  // handleLogin(value: any) {
  //   signInWithEmailAndPassword(this.auth, value.email, value.password)
  //     .then((response: any) => console.log(response.user))
  //     .catch((err) => alert(err.message));
  // }
}
