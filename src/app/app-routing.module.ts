import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesListComponent } from './dishes/dishes-list/dishes-list.component';
import { DishesComponent } from './dishes/dishes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersFormComponent } from './orders/orders-form/orders-form.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/clients/all'
  },
  {
    path: 'orders',
    component: OrdersComponent,
    children: [
      {
        path: 'new',
        component: OrdersFormComponent
      }
    ]
  },
  {
    path: 'dishes',
    component: DishesComponent,
    children: [
      {
        path: 'all',
        component: DishesListComponent
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
