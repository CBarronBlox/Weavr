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
var core_1 = require('@angular/core');
var emergency_form_service_1 = require('./emergency-form.service');
var EmergencyReportComponent = (function () {
    function EmergencyReportComponent(service) {
        this.questions = service.getQuestions();
    }
    EmergencyReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-report',
            template: "\n    <div>\n      <h2>Reporting Emergency</h2>\n      <dynamic-form [questions]=\"questions\"></dynamic-form>\n    </div>\n  ",
            providers: [emergency_form_service_1.EmergencyFormService]
        }), 
        __metadata('design:paramtypes', [emergency_form_service_1.EmergencyFormService])
    ], EmergencyReportComponent);
    return EmergencyReportComponent;
}());
exports.EmergencyReportComponent = EmergencyReportComponent;
//# sourceMappingURL=emergency-report.component.js.map