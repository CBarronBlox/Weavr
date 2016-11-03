import { Component, ElementRef,   trigger,
  state,
  style,
  transition,
  animate, OnInit } from '@angular/core';  
 import { AuthenticationService } from '../authentication.service';
import { Router }            from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
    moduleId: module.id,
    selector: 'login-form',
    providers: [AuthenticationService, UserService],
     animations: [
    trigger('loginState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
  templateUrl:'login.component.html' 
})
    
  
 
export class LoginComponent {
 


 	public user = new User()
    public errorMsg = '';

 
    constructor(private _service: AuthenticationService,
    private _router: Router, ) {}



 
     login() {
        if(!this._service.login(this.user)){
            this.errorMsg = 'Failed to login';
        }
    }
        
}
