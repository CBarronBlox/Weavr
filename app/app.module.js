"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('./rxjs-extensions');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var dynamic_form_component_1 = require('./dynamicForm/dynamic-form.component');
var dynamic_form_question_component_1 = require('./dynamicForm/dynamic-form-question.component');
var angular_in_memory_web_api_1 = require('angular-in-memory-web-api');
var in_memory_data_service_1 = require('./in-memory-data.service');
var forms_2 = require('@angular/forms');
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./Dashboard/dashboard.component');
var heroes_component_1 = require('./HeroesView/heroes.component');
var hero_detail_component_1 = require('./HeroDetails/hero-detail.component');
var hero_service_1 = require('./hero.service');
var hero_search_component_1 = require('./hero-search.component');
var emergency_report_component_1 = require('./EmergencyReport/emergency-report.component');
var login_component_1 = require('./Login/login.component');
var authentication_service_1 = require('./authentication.service');
var navigation_component_1 = require('./navigation.component');
var flow_chart_1 = require('./JsFlowChart/flow-chart');
var sign_up_component_1 = require('./Login/sign-up.component');
var user_service_1 = require('./user.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_2.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.HeroData, in_memory_data_service_1.UserData),
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: 'Dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'Dashboard',
                        component: dashboard_component_1.DashboardComponent
                    },
                    {
                        path: 'detail/:id',
                        component: hero_detail_component_1.HeroDetailComponent
                    },
                    {
                        path: 'heroes',
                        component: heroes_component_1.HeroesComponent
                    },
                    {
                        path: 'emergency',
                        component: emergency_report_component_1.EmergencyReportComponent
                    },
                    {
                        path: 'Login',
                        component: login_component_1.LoginComponent
                    },
                    {
                        path: 'FlowChart',
                        component: flow_chart_1.FlowChartComponent
                    },
                    {
                        path: "SignUp",
                        component: sign_up_component_1.SignUpComponent
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                hero_detail_component_1.HeroDetailComponent,
                heroes_component_1.HeroesComponent,
                hero_search_component_1.HeroSearchComponent,
                emergency_report_component_1.EmergencyReportComponent,
                dynamic_form_component_1.DynamicFormComponent,
                dynamic_form_question_component_1.DynamicFormQuestionComponent,
                login_component_1.LoginComponent,
                navigation_component_1.NavigationComponent,
                sign_up_component_1.SignUpComponent,
                flow_chart_1.FlowChartComponent
            ],
            providers: [
                hero_service_1.HeroService,
                authentication_service_1.AuthenticationService,
                user_service_1.UserService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map