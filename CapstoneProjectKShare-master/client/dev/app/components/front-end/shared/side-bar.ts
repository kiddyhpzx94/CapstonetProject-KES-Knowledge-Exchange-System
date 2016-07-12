import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { ROUTER_DIRECTIVES, Router} from '@angular/router';
import { Knowledge } from '../../../interface/knowledge';
import { KnowledgeService } from '../../../services/knowledge';
@Component({
  selector : 'sidebar',
  templateUrl: 'client/dev/app/components/front-end/shared/templates/side-bar.html',
  styleUrls: ['client/dev/app/components/front-end/shared/styles/side-bar.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class SideBarComponent {
  constructor(private _knowledgeService: KnowledgeService){

  }
  knowledges: Knowledge[];

  ngOnInit(): void {
    this._knowledgeService.getAllKnowledges().subscribe((knowledges) => {
      var parent = [];
      var subCate = [];
      for(var i = 0;i < knowledges.length;i++){
        if(!knowledges[i].hasOwnProperty('parent')){
          parent.push(knowledges[i]);
        }
      }
      for(var i = 0;i<parent.length;i++){
        for(var j = 0;j< knowledges.length;j++){
          if((knowledges[j].hasOwnProperty('parent'))&&(knowledges[j].parent===parent[i]._id)){
            subCate.push(knowledges[j]);
          }
        }
        parent[i]["subCategory"] = subCate;
        subCate = [];
      }
      this.knowledges = parent;
    });
  }
}
