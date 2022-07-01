import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ClientsComponent } from './clients/clients.component';
import { DishesComponent } from './dishes/dishes.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
        path: ':clientId',
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
    redirectTo: '/clients'
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'dishes',
    component: DishesComponent
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
