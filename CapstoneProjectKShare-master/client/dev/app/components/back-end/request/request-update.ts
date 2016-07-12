import { Component, OnInit, Inject } from '@angular/core';
import { Request } from '../../../interface/request';
import { Knowledge } from '../../../interface/knowledge';

import { RequestService } from '../../../services/requests';
import { KnowledgeService } from '../../../services/knowledge';

import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from'@angular/router';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, AbstractControl  } from '@angular/common';

@Component({
  selector: 'request-update-cli',
  templateUrl: 'client/dev/app/components/back-end/request/templates/request-update.html',
  styleUrls: ['client/dev/asserts/css/backend-styles.css'],
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class UpdateRequestComponent {
  updateRequestFormCli: ControlGroup;

  knowledges: Knowledge[];

  id: string;

  request: Request;
  _id: string;
  title: string;
  description: string;
  knowledgeId: string;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    @Inject(RequestService) private _requestService: RequestService,
    public router: Router,
    private route: ActivatedRoute,
    @Inject(KnowledgeService)
    private _knowledgeService: KnowledgeService) {
    this.route
      .params
      .subscribe(params => {
        this.id = params['id'];
      });

    this.updateRequestFormCli = fb.group({
      "_id": [""],
      "title": [""],
      "description": [""],
      "knowledgeId": [""]
    });
  }

  ngOnInit(): void {
    //get all back.knowledge
    this._knowledgeService.getAllKnowledges().subscribe((knowledges) => {
      this.knowledges = this._knowledgeService.getChildFromParent(knowledges);
    });

    this._requestService.getRequestById(this.id).subscribe(
      (request) => {
        this.request = request;
        this.title = request.title;
        this.description = request.description;
        this._id = request._id;
      },
      (error) => {
        console.log(error.text());
      }
    );
  }

  updateRequest(request) {
    console.log(request);
    this._requestService.updateRequest(request).subscribe((request) => {
      console.log('update successed');
    },
      (error) => {
        console.log(error.text());
      }
    );
    this.router.navigateByUrl('admin/requests');
  }

}
