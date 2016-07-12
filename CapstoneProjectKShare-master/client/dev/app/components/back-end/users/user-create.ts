import {
  Component,
  Inject
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  ControlGroup,
  Control,
  FORM_DIRECTIVES,
} from '@angular/common';
import {
  Router,
  Routes
} from '@angular/router';

// UI
import {
  Dialog,
  Calendar
} from 'primeng/primeng';

// Interfaces & services
import  { User } from '../../../interface/user';
import  { UserService} from '../../../services/users';
@Component({
  selector: 'user-create',
  templateUrl: 'client/dev/app/components/back-end/users/templates/user-create.html',
  styleUrls: ['client/dev/asserts/css/backend-styles.css'],
  directives: [
    FORM_DIRECTIVES,
    Dialog,
    Calendar
  ],
})
export class CreateUserComponent {
  display: boolean = false;
  pageHeader: string = "Create User";
  users: User[] = [];
  userForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(UserService) private _userService: UserService, public router: Router) {
    this.userForm = fb.group({
      firstName : [""],
      lastName : [""],
      displayName: [""],
      birthday: [""],
      username: ["",Validators.required],
      password: ["",Validators.required],
      email: ["",Validators.required],
      role: ["",Validators.required],
      ownKnowledgeId: [""],
      interestedKnowledgeId: [""],
      onlineTime: [""]
    })
  }
  addUser(user: any): void {
      this._userService
          .addUser(user)
          .subscribe(
            response => {
              window.location.reload();
          },
            error => {
              console.log(error.text());
            }
          );
  }
}
