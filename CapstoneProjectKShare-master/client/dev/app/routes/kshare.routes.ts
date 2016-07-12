/**
 * Created by GiangDH on 7/9/16.
 */
import { RouterConfig }          from '@angular/router';

//Root Component
import { KshareComponent } from '../components/kshare.component';
//Function Components
import { HomeComponent} from "../components/front-end/home/home";
import { RequestListClientComponent } from "../components/front-end/request/request-list";
import { RequestDetailClientComponent } from "../components/front-end/request/request-detail";
import { RequestUpdateClientComponent } from "../components/front-end/request/request-update";
import { RequestCategoryComponent } from "../components/front-end/request/request-search";
import { KSpaceComponent } from "../components/front-end/kspace/kspace";
import { KSpaceListComponent } from "../components/front-end/kspace/kspace-list";
import { KSpaceInfoComponent } from "../components/front-end/kspace/kspace-info";
import { FriendListComponent } from "../components/front-end/user-profile/friend-list";
import { UserProfileComponent } from "../components/front-end/user-profile/user-profile";

export const KShareRoutes: RouterConfig = [
  {
    path: '',
    component: KshareComponent,
    children: [
      {
        path: 'user',
        children: [
          {
            path: ':name',
            children: [
              {
                path: 'friends',
                component: FriendListComponent
              },
              {
                path: '',
                component: UserProfileComponent
              }
            ]
          }
        ]
      },
      {
        path: 'kspace',
        children: [
          {
            path: 'room',
            children: [{
              path:':id',
              component: KSpaceComponent
            }]
          },
          {
            path: 'info',
            children: [{
              path:':id',
              component: KSpaceInfoComponent
            }]
          },
          {
            path: '',
            component: KSpaceListComponent
          }
        ]
      },
      {
        path: 'requests',
        children: [
          {
            path: ':id',
            children:[
              {
                path: 'info',
                component:RequestDetailClientComponent
              },
              {
                path: 'update',
                component: RequestUpdateClientComponent
              }
            ]
          },
          {
            path: ':type/:id',
            component: RequestCategoryComponent
          },
          {
            path: '',
            component: RequestListClientComponent
          }
        ]
      },
      {
        path: '',
        component: HomeComponent
      }
    ],
  }
];

