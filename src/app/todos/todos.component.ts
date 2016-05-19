import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FilterLink } from './components/filter-link';
import { TodoList } from './components/todo-list';
import { TodosActions } from './actions/todos.actions';

@Component({
  selector: `todo-app`,
  template: `
	<div>
		<section id="todoapp">
		  <header id="header">
        <h1>todos</h1>
        <form id="todo-form" (ngSubmit)="addTodo(input)" autocomplete="off">
          <input id="new-todo" placeholder="What needs to be done?" #input>
        </form>
      </header>
      <div>
        <p>Show:
          <filter-link filter="SHOW_ALL">All</filter-link>,
          <filter-link filter="SHOW_ACTIVE">Active</filter-link>,
          <filter-link filter="SHOW_COMPLETED">Completed</filter-link>
        </p>
        <todo-list
          [todos]="todosActions.todos$ | async"
          (toggleTodo)="todosActions.toggleTodo($event)"
          (deleteTodo)="todosActions.deleteTodo($event)">
        </todo-list>
      </div>
		</section>
	</div>
	`,
  styles: [require('./todo.css')],
  encapsulation: ViewEncapsulation.None,
  directives: [FilterLink, TodoList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoApp {

  constructor(
    public todosActions: TodosActions
  ){}

  addTodo(element){
    this.todosActions.addTodo(element.value);
    element.value = "";
  }
}
