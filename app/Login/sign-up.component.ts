import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Location }               from '@angular/common';
import { UserService } from '../user.service';
@Component({
    moduleId: module.id,
    selector: 'signup',
    templateUrl: 'sign-up.component.html'
})

export class SignUpComponent implements OnInit {
  
  user: User;
    constructor(private location: Location,
                private userService: UserService) { }

    ngOnInit() { 
  
    }
  save(): void {
    this.userService.update(this.user)
      .then(() => this.goBack());
  }
  

     goBack(): void {
    this.location.back();
  }
}