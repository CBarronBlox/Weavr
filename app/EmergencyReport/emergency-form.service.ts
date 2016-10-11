import { Injectable }       from '@angular/core';

import { QuestionBase }     from '../dynamicForm/question-base';
import { TextboxQuestion }  from '../dynamicForm/question-textbox';
import { DropdownQuestion } from '../dynamicForm/question-dropdown';



@Injectable()
export class EmergencyFormService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {
    let questions: QuestionBase<any>[] = [

       new TextboxQuestion({
        key: 'description',
        label: 'Description',
        order: 3
      }),
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        order: 1
      }),
      new TextboxQuestion({
        key: 'date',
        label: 'Date',
        type: 'date',
        order: 2
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
