import {
  Component,
  OnInit,
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  Router
} from '@angular/router';

import {
  DataTable,
  Column,
  Header,
  MultiSelect,
  Footer,
  InputText
} from 'primeng/primeng';

import  { User } from '../../../interface/user';

import  { UserService} from '../../../services/users';
import  { AuthService} from '../../../services/auth';
import  { CreateUserComponent } from './user-create';

@Component({
  selector: 'user-list',
  templateUrl: 'client/dev/app/components/back-end/users/templates/user-list.html',
  styleUrls: [
    'client/dev/asserts/css/backend-styles.css',
    'client/dev/app/components/back-end/users/styles/user.css'
  ],
  directives: [
    CreateUserComponent,
    DataTable,
    Column,
    Header,
    Footer,
    MultiSelect,
    ROUTER_DIRECTIVES
  ],
  providers:[
    CreateUserComponent
  ]
})

export class UserListComponent {
  pageTitle: string = 'user';
  errorMessage: string;
  roleToken:string;
  users: User[];
  numOfUser: number = 0;
  constructor(private _userService: UserService, private _auth:AuthService, private router: Router){

  }

  ngOnInit(): void {
    this._userService
      .getAllUsers()
      .then(
      (users) => {
        for (var i = 0; i < users.length; i++) {
          if (users[i].birthday) {
            users[i].birthday = new Date(users[i].birthday);
          }
          users[i].createdAt = new Date(users[i].createdAt);
          if (users[i].updatedAt) {
            users[i].updatedAt = new Date(users[i].updatedAt);
          }
        }
        this.users = users;
        this.numOfUser = i;
      },
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }
}
