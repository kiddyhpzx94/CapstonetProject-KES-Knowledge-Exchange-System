/**
 * Created by GiangDH on 5/19/16.
 */
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
import { Router, Routes } from '@angular/router';
import { User } from '../../../interface/user.ts';
import { AuthService } from '../../../services/auth';
@Component({
  selector : 'register',
  templateUrl: 'client/dev/app/components/front-end/shared/templates/register.html',
  styleUrls: ['client/dev/app/components/front-end/shared/styles/login.css'],
  directives: [FORM_DIRECTIVES]
})

export class RegisterComponent {
  user: User[] = [];
  regForm: ControlGroup;
  userValid:string;
  passValid:string;
  emailValid:string;
  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(AuthService) private _authService: AuthService, public router: Router) {
    this.regForm = fb.group({
      username: ["",Validators.required],
      password: ["",Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')],
      email: ["",Validators.pattern('^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$')]
    })
  }
  register(user: any): void {
    this._authService
      .register(user)
      .subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
  }

}
