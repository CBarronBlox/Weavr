import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router }            from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { UserService } from './user.service';

let users: User[] = []
@Injectable()
export class AuthenticationService {



    constructor(
    private _router: Router){}
               

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['Login']);
  }
 
  login(user: User): boolean {
    let authenticatedUser = users.find(u => u.username === user.username);
    if (authenticatedUser && authenticatedUser.password === user.password){
    localStorage.setItem(authenticatedUser.name, authenticatedUser.username);
      this._router.navigate(['Dashboard']);      
      return true;
    }
    return false;
 
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['Login'])
        let meeeeee = "this is working fix routing issue";
        return meeeeee
    }
  } 
}