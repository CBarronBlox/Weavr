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
var question_textbox_1 = require('./question-textbox');
var EmergencyFormService = (function () {
    function EmergencyFormService() {
    }
    // Todo: get from a remote source of question metadata
    // Todo: make asynchronous
    EmergencyFormService.prototype.getQuestions = function () {
        var questions = [
            new question_textbox_1.TextboxQuestion({
                key: 'description',
                label: 'Description',
                order: 3
            }),
            new question_textbox_1.TextboxQuestion({
                key: 'firstName',
                label: 'First name',
                required: true,
                order: 1
            }),
            new question_textbox_1.TextboxQuestion({
                key: 'date',
                label: 'Date',
                type: 'date',
                order: 2
            })
        ];
        return questions.sort(function (a, b) { return a.order - b.order; });
    };
    EmergencyFormService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EmergencyFormService);
    return EmergencyFormService;
}());
exports.EmergencyFormService = EmergencyFormService;
//# sourceMappingURL=emergency-form.service.js.map