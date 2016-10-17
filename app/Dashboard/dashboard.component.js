"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Subject_1 = require('rxjs/Subject');
var hero_service_1 = require('../hero.service');
var authentication_service_1 = require('../authentication.service');
var navigation_component_1 = require('../navigation.component');
var wikipedia_service_1 = require('../wikipedia.service');
var DashboardComponent = (function () {
    function DashboardComponent(router, heroService, _service, wikipediaService) {
        var _this = this;
        this.router = router;
        this.heroService = heroService;
        this._service = _service;
        this.wikipediaService = wikipediaService;
        this.heroes = [];
        this.users = [];
        this.searchTermStream = new Subject_1.Subject();
        this.items = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this.wikipediaService.search(term); });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.checkCredentials();
        this.heroService.getHeroes()
            .then(function (heroes) { return _this.heroes = heroes.slice(1, 5); });
    };
    DashboardComponent.prototype.gotoDetail = function (hero) {
        var link = ['/detail', hero.id];
        this.router.navigate(link);
    };
    DashboardComponent.prototype.logout = function () {
        this._service.logout();
    };
    DashboardComponent.prototype.search = function (term) { this.searchTermStream.next(term); };
    DashboardComponent = __decorate([
        core_1.NgModule({
            declarations: [navigation_component_1.NavigationComponent]
        }),
        core_1.Component({
            moduleId: module.id,
            selector: 'login-form',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css'],
            providers: [authentication_service_1.AuthenticationService, wikipedia_service_1.WikipediaService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, hero_service_1.HeroService, authentication_service_1.AuthenticationService, wikipedia_service_1.WikipediaService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map