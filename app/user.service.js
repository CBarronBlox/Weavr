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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
require('rxjs/add/operator/toPromise');
var users;
var UserService = (function () {
    function UserService(_router, http) {
        this._router = _router;
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.usersUrl = 'app/users'; // URL to web api
    }
    UserService.prototype.getUsers = function () {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem("user");
        this._router.navigate(['Login']);
    };
    UserService.prototype.login = function (user) {
        var authenticatedUser = users.find(function (u) { return u.username === user.username; });
        if (authenticatedUser && authenticatedUser.password === user.password) {
            localStorage.setItem(authenticatedUser.name, authenticatedUser.username);
            this._router.navigate(['Dashboard']);
            return true;
        }
        return false;
    };
    UserService.prototype.checkCredentials = function () {
        if (localStorage.getItem("user") === null) {
            this._router.navigate(['Login']);
        }
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map