import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsComponent } from './clients.component';


const routes: Routes = [
  {
    path: '',
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
        ],
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'all'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientsRoutingModule { }
