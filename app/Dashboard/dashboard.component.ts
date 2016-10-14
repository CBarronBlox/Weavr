import { Component, OnInit, NgModule } from '@angular/core';
import { Router }            from '@angular/router';
import { Hero }        from '../hero';
import { HeroService } from '../hero.service';
import { AuthenticationService, User } from '../authentication.service';
import { NavigationComponent } from '../navigation.component';
@NgModule({
declarations: [NavigationComponent]
})
@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ],
  providers: [AuthenticationService],

})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  users: User[] = [];
  constructor(
    private router: Router,
    private heroService: HeroService,
    private _service: AuthenticationService) {
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


