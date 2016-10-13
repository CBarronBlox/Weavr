import { Component, ElementRef } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
 import { AuthenticationService } from '../authentication.service';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    providers: [UserService, AuthenticationService],
    template: `
        <div class="container" >
            <div class="title">
                Welcome
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="input-field col s12">
                        <input [(ngModel)]="user.username" id="username" 
                            type="text" class="validate">
                        <label for="username">Username</label>
                    </div>
                </div>
 
                <div class="row">
                    <div class="input-field col s12">
                        <input [(ngModel)]="user.password" id="password" 
                            type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
 
                <span>{{errorMsg}}</span>
                <button (click)="login()"  
                    type="submit" name="action">Login</button>
            </div>
        </div>
    	`
})
 
export class LoginComponent {
 	
	public user = new User();
    public errorMsg = '';
    
 
    constructor(private _service: AuthenticationService) {}
 
    login() {
        if(!this._service.login(this.user)){this.errorMsg = 'Failed to login';}
    }
}