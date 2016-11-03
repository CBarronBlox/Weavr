
import { Injectable, OnInit }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router }            from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { User } from './user';

 


@Injectable( )
export class AuthenticationService{ 
  users =  [{name:'conner',username:'black', password: '12', id:1}];

constructor(private _router: Router,){}



  

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['Login']);
  }
 
  login(user: any){
    let authenticatedUser = this.users.find(u => u.username === user.username);
    if (authenticatedUser && authenticatedUser.password === user.password){
    localStorage.setItem('user', authenticatedUser.username);
      this._router.navigate(['Dashboard']);      
      return true;
    }
    return false;
 
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['Login'])
    }

    }

   
   
}
