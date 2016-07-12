import {
  Component,
  OnInit
} from '@angular/core';

import {
  ROUTER_DIRECTIVES,
  Router
} from '@angular/router';

import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Control
} from '@angular/common';


import { Knowledge } from '../../../interface/knowledge';

import { KnowledgeService } from '../../../services/knowledge';
import { UpdateKnowledgeComponent } from './knowledge-update';
import { CreateSubCategoryComponent } from './sub-knowledge-create';
import { AuthService} from '../../../services/auth';
import { CreateKnowledgeComponent } from './knowledge-create';

@Component({
  selector: 'knowledge-list',
  templateUrl: 'client/dev/app/components/back-end/knowledge/templates/knowledge-list.html',
  styleUrls: [
    'client/dev/app/components/back-end/knowledge/styles/knowledge.css',
    'client/dev/asserts/css/backend-styles.css'
  ],
  directives: [
    UpdateKnowledgeComponent,
    CreateSubCategoryComponent,
    CreateKnowledgeComponent,
    ROUTER_DIRECTIVES
  ]
})

export class KnowledgeListComponent {
  pageTitle: string = 'Knowledge List';
  errorMessage: string;

  knowledges: Knowledge[];

  constructor(private _knowledgeService: KnowledgeService){

  }

  ngOnInit(): void {
    this._knowledgeService.getAllKnowledges().subscribe((knowledges) => {
      this.knowledges = this._knowledgeService.getChildFromParent(knowledges);
      console.log(this.knowledges);
    });
  }
  private deleteKnowledge(id):void {
    this._knowledgeService
      .deleteKnowledge(id)
      .subscribe(() => {
          window.location.reload();
      })
  }
}
