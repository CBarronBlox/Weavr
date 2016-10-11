import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }          from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { DynamicFormComponent } from './dynamicForm/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamicForm/dynamic-form-question.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { FormsModule }   from '@angular/forms';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './Dashboard/dashboard.component';
import { HeroesComponent }      from './HeroesView/heroes.component';
import { HeroDetailComponent }  from './HeroDetails/hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';
import { EmergencyReportComponent } from './EmergencyReport/emergency-report.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'detail/:id',
        component: HeroDetailComponent
      },
      {
        path: 'heroes',
        component: HeroesComponent
      },
      {
      path: 'emergency',
      component: EmergencyReportComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    EmergencyReportComponent,
    DynamicFormComponent, DynamicFormQuestionComponent
  ],
  providers: [
    HeroService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  
}


