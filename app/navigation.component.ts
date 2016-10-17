import { Component }  from '@angular/core';
import { AuthenticationService, User } from './authentication.service';

@Component({
  moduleId: module.id,
  selector: 'navigation',

  template: `
  <div>
    <a (click)="logout()" href="#">Click Here to logout</a>
    </div>
    <nav>
    <a routerLink="/Dashboard">Dashboard</a>
    <a routerLink="/emergency">Emergency Report</a>
    <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>

  `,
  styleUrls: ['app.component.css']
})
export class NavigationComponent {
constructor(private _service: AuthenticationService,){}
logout() {
   this._service.logout();
  }
}