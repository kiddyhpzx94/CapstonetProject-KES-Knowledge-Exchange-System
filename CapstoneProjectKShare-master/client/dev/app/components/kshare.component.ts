/**
 * Created by GiangDH on 6/4/16.
 */
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

/**
 * Shared components
 */

import { HeaderComponent } from "./front-end/shared/header";
import { SideBarComponent } from "./front-end/shared/side-bar";
import { FooterComponent } from "./front-end/shared/footer";
import { LoginComponent} from "./front-end/shared/login";
import { RegisterComponent} from "./front-end/shared/register";

import { UserProfileComponent } from "./front-end/user-profile/user-profile";

/**
 * Page components
 */
import { HomeComponent} from "./front-end/home/home";
import { RequestListClientComponent } from "./front-end/request/request-list";
import { RequestDetailClientComponent } from "./front-end/request/request-detail";
import { RequestUpdateClientComponent } from "./front-end/request/request-update";
import { RequestCategoryComponent } from "./front-end/request/request-search";
import { KSpaceComponent } from "./front-end/kspace/kspace";
import { KSpaceListComponent } from "./front-end/kspace/kspace-list";
import { KSpaceInfoComponent } from "./front-end/kspace/kspace-info";
import { FriendListComponent } from "./front-end/user-profile/friend-list";



/**
 * Page components
 */


@Component({
  selector: 'kshare-app',
  template:`
    <header></header>
    <sidebar></sidebar>
    <router-outlet></router-outlet>
    <login></login>
    <register></register>
    <footer></footer>
  `,
  directives: [
    ROUTER_DIRECTIVES,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  precompile: [
    HomeComponent,
    RequestListClientComponent,
    RequestDetailClientComponent,
    RequestUpdateClientComponent,
    RequestCategoryComponent,
    KSpaceComponent,
    KSpaceListComponent,
    KSpaceInfoComponent,
    UserProfileComponent,
    FriendListComponent
  ]
})
export class KshareComponent {

}
