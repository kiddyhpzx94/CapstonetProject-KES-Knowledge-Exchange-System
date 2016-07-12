/**
 * Created by GiangDH on 5/18/16.
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
  CORE_DIRECTIVES
} from '@angular/common';
import {
  Router,
  ROUTER_DIRECTIVES
} from '@angular/router';
import { User } from '../../../interface/user.ts';
import { AuthService } from '../../../services/auth';
@Component({
  selector : 'login',
  templateUrl: 'client/dev/app/components/front-end/shared/templates/login.html',
  styleUrls: ['client/dev/app/components/front-end/shared/styles/login.css'],
  directives:[
    ROUTER_DIRECTIVES,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES
  ]
})

export class LoginComponent {

  user: User[] = [];
  loginForm: ControlGroup;
  userValid:string;
  passValid:string;
  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(AuthService) private _authService: AuthService, public router: Router) {
    this.loginForm = fb.group({
      username: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  login(user: any): void {
    this._authService
      .login(user)
      .subscribe(
        res => {
          if(res.invalidUsername){
            this.userValid = '*'+res.invalidUsername;
            this.passValid = null;
          } else if(res.invalidPassword){
            this.passValid = '*'+res.invalidPassword;
            this.userValid = null;
          } else {
            localStorage.setItem('username', res.username);

            if(res.role == 'admin'){
              localStorage.setItem('userrole', res.role);
            }else{
              localStorage.setItem('userrole', 'normal');
            }
            window.location.reload();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
