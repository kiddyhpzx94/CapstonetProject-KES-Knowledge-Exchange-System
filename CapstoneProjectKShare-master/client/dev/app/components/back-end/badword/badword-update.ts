
import {
  Component,
  Inject,
  Input
} from '@angular/core';

import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Control,
  AbstractControl
} from '@angular/common';

import {
  Router,
  ROUTER_DIRECTIVES,
  ActivatedRoute
} from'@angular/router';

//interface
import { Badword } from '../../../interface/badword';

//services
import { BadwordService } from '../../../services/badword';
import { CreateBadwordComponent } from './badword-create';
import { BadwordListComponent } from './badwords-list';


@Component({
  selector: 'badword-update',
  templateUrl: 'client/dev/app/components/back-end/badword/templates/badword-update.html',
  styleUrls: ['client/dev/app/components/back-end/badword/styles/badword.css'],
  directives: [
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  providers: [BadwordService]
})

export class UpdateBadwordComponent {
  updateBadwordForm: ControlGroup;

  id: string;

  badword: Badword;
  _id: string;
  word: string;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    @Inject(BadwordService) private _badwordService: BadwordService,
    public router: Router,
    private route: ActivatedRoute) {

    this.route
      .params
      .subscribe(params => {
        this.id = params['id'];
      });
    this.updateBadwordForm = fb.group({
      "word": [""],
      "_id":[""],
    });
  }

  ngOnInit():void {
    this._badwordService.findBadwordById(this.id).subscribe(
      (badword) => {
        this.badword = badword;
        this.word = badword.word;
        this._id = badword._id;

    },
      (error) => {
        console.log(error.text());
      }
    );
  }

  updateBadword(badword) {
    this._badwordService.updateBadword(badword).subscribe((badword)=> {
      console.log('update successed');
    },
    (error) => {
      console.log(error.text());
    }
    );
    window.location.href = 'admin/badwords';
  }

}
