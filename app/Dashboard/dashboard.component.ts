import { Component, OnInit, NgModule } from '@angular/core';
import { Router }            from '@angular/router';
import { Subject }          from 'rxjs/Subject';
import { Hero }        from '../hero';
import { HeroService } from '../hero.service';
import { AuthenticationService, User } from '../authentication.service';
import { NavigationComponent } from '../navigation.component';
import { Observable }       from 'rxjs/Observable';
import { WikipediaService } from '../wikipedia.service';
@NgModule({
declarations: [NavigationComponent]
})
@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ],
  providers: [AuthenticationService,WikipediaService]

})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  users: User[] = [];
  
  constructor(
    private router: Router,
    private heroService: HeroService,
    private _service: AuthenticationService,
    private wikipediaService: WikipediaService) {}

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
    private searchTermStream = new Subject<string>();
  search(term: string) { this.searchTermStream.next(term); }
  items: Observable<string[]> = this.searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term: string) => this.wikipediaService.search(term));
}


