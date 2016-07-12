import {
  Component,
  Inject
} from '@angular/core';
import {Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
@Component({
  selector: 'sidebar',
  templateUrl: 'client/dev/app/components/back-end/shared/templates/side-bar.html',
  styleUrls: ['client/dev/asserts/css/backend-styles.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class SidebarComponent {
  @Input() pageTitle: string;
}
