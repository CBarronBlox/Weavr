import { Component, NgModule } from '@angular/core';
import { Router }            from '@angular/router';
import { EmergencyFormService } from './emergency-form.service';
import {AuthenticationService, User } from '../authentication.service';
import { Hero }                from '../hero';
import { HeroService }         from '../hero.service';
import { NavigationComponent } from '../navigation.component';
@NgModule({
declarations: [NavigationComponent]
})
@Component({
  moduleId: module.id,
  selector: 'my-report',
    template: `<navigation></navigation>
    <div>
      <h2>Reporting Emergency</h2>
      <dynamic-form [questions]="questions"></dynamic-form>
    </div>
  `,
  providers:  [EmergencyFormService, AuthenticationService]

})

export class EmergencyReportComponent {
	  questions: any[];
  constructor(service: EmergencyFormService) {
    this.questions = service.getQuestions();
  }
}