import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router }            from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { User } from './user';

let users: User[]

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'app/users';  // URL to web api
 
    constructor(
    private _router: Router,
    private http: Http){}

    getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
               .toPromise()
               .then(response => response.json().data as User[])
               
 }
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
        this._router.navigate(['Login']);
    }
  } 
}