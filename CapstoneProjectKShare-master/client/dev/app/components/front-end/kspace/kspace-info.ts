/**
 * Created by GiangDH on 7/9/16.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { KSpaceService } from '../../../services/kspace';

@Component ({
  template: `
      <h1> Hello </h1>
    `
})

export class KSpaceInfoComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log("Hello");
  }
  ngOnDestroy(): void {

  }
}
