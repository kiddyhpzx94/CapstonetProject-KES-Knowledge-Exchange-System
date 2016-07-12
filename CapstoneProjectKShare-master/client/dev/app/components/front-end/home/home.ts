/**
 * Created by GiangDH on 5/18/16.
 */
import { Component,OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component ({
  selector: 'home',
  templateUrl:'client/dev/app/components/front-end/home/templates/home.html',
  directives: [
    ROUTER_DIRECTIVES
  ]
})

export class HomeComponent {
  pageTitle: string = 'Welcome to Knowledge Sharing Network';
  ngOinit(): void{
    console.log("what the fuck");
  }
}
