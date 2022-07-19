import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsComponent } from './clients/clients.component';
import { DishesListComponent } from './dishes/dishes-list/dishes-list.component';
import { DishesComponent } from './dishes/dishes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersFormComponent } from './orders/orders-form/orders-form.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent,
    children: [
      {
        path: 'create',
        component: ClientsFormComponent
      },
      {
        path: 'all',
        component: ClientsListComponent
      },
      {
        path: ':id',
        children: [
          {
            path: 'read',
            component: ClientComponent
          },
          {
            path: 'update',
            component: ClientsFormComponent
          },
          {
            path: 'delete',
            component: ClientComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'read'
          }
        ]
      },
    ]
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
