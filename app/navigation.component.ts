import { Component }  from '@angular/core';
import { AuthenticationService} from './authentication.service';
import { Router }            from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'navigation',

  template: `
  <div>
  <button (click)= "logout()" href="#">Log Out</button>
    </div>
    <nav>
    <a routerLink="/FlowChart">Flow Chart</a>
    <a routerLink="/Dashboard">Dashboard</a>
    <a routerLink="/emergency">Emergency Report</a>
    <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>

  `,
  styleUrls: ['app.component.css']
})
export class NavigationComponent {
constructor(private _service: AuthenticationService,
private _router: Router){}

 logout() {
        this._service.logout();
    }
}