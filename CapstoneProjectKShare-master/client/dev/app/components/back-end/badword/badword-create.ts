import {
  Component,
  Inject,
} from '@angular/core';
import  {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Control
} from '@angular/common';

import  { Badword } from '../../../interface/badword';
import  { BadwordService} from '../../../services/badword';

@Component({
  selector: 'badword-create',
  templateUrl: 'client/dev/app/components/back-end/badword/templates/badword-create.html',
  styleUrls: ['client/dev/app/components/back-end/badword/styles/badword.css'],
  directives: [FORM_DIRECTIVES]
})
export class CreateBadwordComponent {
  badwordForm: ControlGroup;
  badwords: Badword[]= [];
  constructor(fb: FormBuilder, private _badwordService: BadwordService) {
    this.badwordForm = fb.group({
      "word": [""],
    });
  }

  addBadword(word):void {
    this._badwordService
        .addBadword(word)
        .subscribe((m) => {
          this.badwords.push(m);
          window.location.reload();
        });
  }
}
