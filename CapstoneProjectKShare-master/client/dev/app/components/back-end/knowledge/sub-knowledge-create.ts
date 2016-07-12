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

import { KnowledgeService } from '../../../services/knowledge';

@Component({
  selector: 'sub-create',
  templateUrl: 'client/dev/app/components/back-end/knowledge/templates/sub-knowledge-create.html',
  directives: [FORM_DIRECTIVES]
})
export class CreateSubCategoryComponent {
   @Input('kId') kId: string;

   subCategoryForm: ControlGroup;

   constructor(fb: FormBuilder, private _knowledgeService: KnowledgeService) {
    this.subCategoryForm = fb.group({
      "name": [""],
      "description": [""],
      "parent": [""]
    });
  }

  ngOnInit(): void {

  }
  addKnowledge(knowledge) {
    this._knowledgeService.addKnowledge(knowledge).subscribe((knowledge)=> {
      console.log('success');
    },
    (error) => {
      console.log(error.text());
    }
    );

    window.location.reload();
  }

}
