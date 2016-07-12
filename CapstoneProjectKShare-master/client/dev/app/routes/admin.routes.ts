/**
 * Created by GiangDH on 7/9/16.
 */
import { RouterConfig }  from '@angular/router';

import {AdminComponent}  from '../components/admin.component';


import { UpdateKnowledgeComponent } from '../components/back-end/knowledge/knowledge-update';
import { KnowledgeListComponent } from '../components/back-end/knowledge/knowledges-list';
import { RequestListComponent } from "../components/back-end/request/requests-list";
import { UpdateRequestComponent } from "../components/back-end/request/request-update";
import { UpdateBadwordComponent } from "../components/back-end/badword/badword-update";
import { BadwordComponent } from "../components/back-end/badword/badword";
import { UserListComponent } from "../components/back-end/users/user-list";


export const AdminRoutes: RouterConfig = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UserListComponent
          }
        ]
      },
      {
        path: 'knowledges',
        children: [
          {
            path: '',
            component: KnowledgeListComponent
          },
          {
            path: ':id',
            component: UpdateKnowledgeComponent
          }
        ]
      },
      {
        path: 'requests',
        children: [
          {
            path: '',
            component: RequestListComponent
          },
          {
            path: ':id',
            component: UpdateRequestComponent
          }
        ]
      },
      {
        path: 'badwords',
        children: [
          {
            path: '',
            component: BadwordComponent
          } ,
          {
            path: ':id',
            component: UpdateBadwordComponent
          }
        ]
      },
      {
        path: '',
        redirectTo:'users'
      }
    ]
  }
];

