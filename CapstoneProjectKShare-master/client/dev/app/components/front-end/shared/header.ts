/**
 * Created by GiangDH on 5/18/16.
 */
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router} from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'header',
  templateUrl: 'client/dev/app/components/front-end/shared/templates/header.html',
  styleUrls: ['client/dev/app/components/front-end/shared/styles/header.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {
  loginToken:boolean = false;
  userToken:string;
  roleToken:string;

  constructor(private _auth: AuthService, public router: Router){
    this.userToken = localStorage.getItem('username');
    this.roleToken = localStorage.getItem('userrole');
  }

  ngOnInit(): void {
      if(this.userToken){
        this.loginToken = true;
      }
  }
  logout(): void {
    this._auth.logout();
    this._auth.logoutClient();
    window.location.reload();
  }
}
