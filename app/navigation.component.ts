import { Component }  from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'navigation',

  template: `
    <h1>{{title}}</h1>
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
  title = 'Tour of Heroes';
}