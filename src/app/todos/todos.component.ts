import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { TodosActions } from './actions/todos.actions';

@Component({
  selector: `todo-app`,
  templateUrl: 'todo.html',
  styleUrls: ['todo.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoApp {

  constructor(
    public todosActions: TodosActions
  ){}

  activeCount():string{
    const count = this.todosActions.activeCount();
    if (count == 0) return '';
    if (count == 1) return '1 item left';
    return count + ' items left';
  }

  addTodo(element){
    this.todosActions.addTodo(element.value);
    element.value = "";
  }
}
