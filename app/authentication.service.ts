
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router }            from '@angular/router';
import 'rxjs/add/operator/toPromise';

export class User {
constructor(
 public name: string,
  public username: string,
 public password: string,
 public id: number){}
}
let users:User[] = [
  new User ('Conner','unfaded','conner12',1)
   ]

@Injectable()
export class AuthenticationService{

constructor(private _router: Router){}
  

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['Login']);
  }
 
  login(user: any){
    let authenticatedUser = users.find(u => u.username === user.username);
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