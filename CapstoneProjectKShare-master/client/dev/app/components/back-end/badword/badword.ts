import {
  Component,
  OnInit
} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import  { NavbarComponent } from '../shared/nav-bar';
import  { SidebarComponent }  from '../shared/side-bar';
import  { BadwordListComponent } from './badwords-list';
import  { CreateBadwordComponent } from './badword-create';
import  { UpdateBadwordComponent} from './badword-update';
import  { Badword } from '../../../interface/badword';
import  { BadwordService } from '../../../services/badword';

@Component({
  selector: 'badword-mgn',
  templateUrl: 'client/dev/app/components/back-end/badword/templates/badword.html',
  directives: [
    BadwordListComponent,
    UpdateBadwordComponent,
    CreateBadwordComponent,
    NavbarComponent,
    SidebarComponent,
    ROUTER_DIRECTIVES
  ],
  providers:[BadwordService],
})
export class BadwordComponent {

}
