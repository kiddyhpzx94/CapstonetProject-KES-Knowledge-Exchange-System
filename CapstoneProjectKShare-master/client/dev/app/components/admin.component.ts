/**
 * Created by GiangDH on 6/4/16.
 */
import { Component } from '@angular/core';
import 'rxjs/Rx';   // Load all features
import { ROUTER_DIRECTIVES} from '@angular/router';

// Layout component
import { NavbarComponent } from './back-end/shared/nav-bar';
import { SidebarComponent } from './back-end/shared/side-bar';

// Functions
import { UpdateKnowledgeComponent } from './back-end/knowledge/knowledge-update';
import { KnowledgeListComponent } from './back-end/knowledge/knowledges-list';
import { RequestListComponent } from "./back-end/request/requests-list";
import { UpdateRequestComponent } from "./back-end/request/request-update";
import { UpdateBadwordComponent } from "./back-end/badword/badword-update";
import { BadwordComponent } from "./back-end/badword/badword";
import { UserListComponent } from "./back-end/users/user-list";

@Component({
  selector: 'kshare',
  template:`
  <nav-bar></nav-bar>
  <sidebar></sidebar>
  <router-outlet></router-outlet>
  `,
  directives: [
    ROUTER_DIRECTIVES,
    NavbarComponent,
    SidebarComponent
  ],
  precompile: [
    UserListComponent,
    RequestListComponent,
    KnowledgeListComponent,
    BadwordComponent,
    UpdateBadwordComponent,
    UpdateKnowledgeComponent,
    UpdateRequestComponent,
  ]
})
export class AdminComponent {}
