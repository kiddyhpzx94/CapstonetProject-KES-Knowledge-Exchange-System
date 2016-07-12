import { Component, Inject, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Control } from '@angular/common';

import { KnowledgeService } from '../../../services/knowledge';
import { RequestService} from '../../../services/requests';
import { Knowledge } from '../../../interface/knowledge';
import { AuthService} from '../../../services/auth';

@Component({
  selector: 'request-create',
  templateUrl: 'client/dev/app/components/back-end/request/templates/request-create.html',
  styleUrls: ['client/dev/app/components/back-end/request/templates/request.css'],
  directives: [FORM_DIRECTIVES]
})
export class CreateRequestComponent {
  user:string;
  roleToken:string;
  requestForm: ControlGroup;

  knowledges: Knowledge[];

  constructor(@Inject(FormBuilder) fb: FormBuilder, @Inject(RequestService) private _requestService: RequestService, private _knowledgeService: KnowledgeService,
                    private _authService: AuthService) {
    this.user = localStorage.getItem('username');
    this.roleToken = localStorage.getItem('userrole');

    this.requestForm = fb.group({
      "knowledgeId": [""],
      "title": [""],
      "description": [""],
      "user": [""]
    });
  }

  ngOnInit(): void {
    this._knowledgeService.getAllKnowledges().subscribe((knowledges) => {
      this.knowledges = this._knowledgeService.getChildFromParent(knowledges);
    });
  }

  addRequest(request) {
    console.log(request);
    this._requestService.addRequest(request).subscribe((request)=> {
      console.log('success');
    },
    (error) => {
      console.log(error.text());
    }
    );
    console.log(request);
    window.location.reload();
  }

}
