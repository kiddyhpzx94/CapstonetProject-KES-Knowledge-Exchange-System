/**
 * Created by GiangDH on 7/9/16.
 */
import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { KSpace } from '../../../interface/kspace';
import { KSpaceService } from '../../../services/kspace';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  template: `
    <div class="container mg-top-50">
          <!-- list all-->
          <div class="search-container">
             <form role="search">
                     <div class="search-component">
                        <input #text type="text" class="form-control search-input" placeholder="Nhập nội dung tìm kiếm">
                        <button (click)="search(text.value)" type="submit"
                        class="search-button fa fa-search fa-2x"
                        aria-hidden="true"></button>
                     </div>
              </form>
           </div><!-- /.search-component -->
          <div *ngIf="kspaces" id="kspace-list-component" class="col-md-12">
            <div class="panel panel-default card-rq" *ngFor="let kspace of kspaces">
              <div class="panel-body">
                <a href="#" >
                  <p class="lead">aaaaa</p>
                </a>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 fixEfMenu">
                  Nội dung :
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 fixEfMenu">
                  Người yêu cầu : {{kspace.learner}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 fixEfMenu">
                  Người dạy : {{kspace.lecturer}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 fixEfMenu">
                  Trạng thái : ddddddd
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-left fixEfMenu">
                  Ngày tạo : {{kspace.createdAt | date:"dd/MM/yyyy"}}
                </div>
            </div>
          </div>
    </div><!-- /.container -->
    `,
  styleUrls: ['client/dev/app/components/front-end/kspace/styles/kspace-list.css']
})

export class KSpaceListComponent{
  kspaces: KSpace[];
  errorMessage: string;
  constructor(
    private _kspaceService: KSpaceService,
    private router: Router
  ){}
  ngOnInit():void {
    console.log('dmc');
    this._kspaceService
      .getAllKSpace()
      .subscribe((kspaces) => {
          for (var i = 0; i < kspaces.length; i++) {
            kspaces[i].createdAt = new Date(kspaces[i].createdAt);
          }
          this.kspaces = kspaces;
        },
        (error) => {
          this.errorMessage = error.message;
          console.log(error);
        });
  }
}
