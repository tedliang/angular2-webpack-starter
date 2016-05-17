import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../reducers/todos';
import { TodoItem } from './todo-item';

@Component({
  selector: 'todo-list',
  template: `
    <section id="main">
      <ul id="todo-list">
          <todo-item *ngFor="let todo of todos"
              [todo]="todo"
              (toggleTodo)="toggleTodo.emit($event)"
              (deleteTodo)="deleteTodo.emit($event)">
          </todo-item>
      </ul>
    </section>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [TodoItem]
})
export class TodoList{
  @Input() todos : Todo[];
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

}
