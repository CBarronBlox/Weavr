import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


import { Hero }        from '../hero';
import { HeroService } from '../hero.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ],
  providers: [UserService, AuthenticationService]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  users: User[] = [];
  constructor(
    private router: Router,
    private heroService: HeroService,
    private _service: AuthenticationService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this._service.checkCredentials();
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
  logout() {
   this._service.logout();
  }
}


