import { Component } from '@angular/core';
import { Router }            from '@angular/router';
import { EmergencyFormService } from './emergency-form.service';

import { Hero }                from './hero';
import { HeroService }         from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-report',
    template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <dynamic-form [questions]="questions"></dynamic-form>
    </div>
  `,
  providers:  [EmergencyFormService]
})

export class EmergencyReportComponent {
	  questions: any[];
  constructor(service: EmergencyFormService) {
    this.questions = service.getQuestions();
  }
}