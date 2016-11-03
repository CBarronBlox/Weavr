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
var authentication_service_1 = require('./authentication.service');
var router_1 = require('@angular/router');
var NavigationComponent = (function () {
    function NavigationComponent(_service, _router) {
        this._service = _service;
        this._router = _router;
    }
    NavigationComponent.prototype.logout = function () {
        this._service.logout();
    };
    NavigationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navigation',
            template: "\n  <div>\n  <button (click)= \"logout()\" href=\"#\">Log Out</button>\n    </div>\n    <nav>\n    <a routerLink=\"/FlowChart\">Flow Chart</a>\n    <a routerLink=\"/Dashboard\">Dashboard</a>\n    <a routerLink=\"/emergency\">Emergency Report</a>\n    <a routerLink=\"/heroes\">Heroes</a>\n    </nav>\n    <router-outlet></router-outlet>\n\n  ",
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router])
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map