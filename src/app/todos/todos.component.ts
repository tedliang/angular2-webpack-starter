import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgPlural } from '@angular/common'
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
        <ul id="timeTravel">
          <li><a href="#undo" *ngIf="todosActions.hasUndo()" (click)="todosActions.undo()">Undo</a></li>
          <li><a href="#redo" *ngIf="todosActions.hasRedo()" (click)="todosActions.redo()">Redo</a></li>
        </ul>
      </header>
      <section id="main">
        <input class="toggle-all" type="checkbox" id="toggle-all"
              #toggleAll 
              [checked]="todosActions.allCompleted()" 
              (click)="todosActions.toggleAll(toggleAll.checked)">
        <label for="toggle-all">Mark all as complete</label>
        <todo-list
          [todos]="todosActions.todos$ | async"
          (updateTodo)="todosActions.updateTodo($event)"
          (toggleTodo)="todosActions.toggleTodo($event)"
          (deleteTodo)="todosActions.deleteTodo($event)">
        </todo-list>
      </section>
      <footer id="footer">
        <span id="todo-count">
          {{ activeCount() }}
        </span>
        <ul id="filters">
          <filter-link filter="SHOW_ALL">All</filter-link>
          <filter-link filter="SHOW_ACTIVE">Active</filter-link>
          <filter-link filter="SHOW_COMPLETED">Completed</filter-link>
        </ul>
        <button id="clear-completed" (click)="todosActions.clearCompleted()">Clear completed</button>
      </footer>
		</section>
	</div>
	`,
  styles: [require('./todo.css')],
  encapsulation: ViewEncapsulation.None,
  directives: [FilterLink, TodoList, NgPlural],
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
