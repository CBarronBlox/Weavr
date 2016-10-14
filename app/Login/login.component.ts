import { Component, ElementRef } from '@angular/core';  
 import { AuthenticationService, User } from '../authentication.service';
import { Router }            from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    providers: [AuthenticationService],
    template: `
        <div class="container" >
            <div class="title">
                Welcome
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="input-field col s12">
<input [(ngModel)]="user.username" id="username" type="text" class="validate">
<label for="username">Username</label>
    </div>
    </div>
 
 <div class="row">
 <div class="input-field col s12">
 <input [(ngModel)]="user.password"  type="password" >
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

 	
	public user = new User ('','','',0);
    public errorMsg = '';
    
 
    constructor(private _service: AuthenticationService,
    private _router: Router) {}
 
    login() {
        if(!this._service.login(this.user)){this.errorMsg = 'Failed to login';}
        
    }
}