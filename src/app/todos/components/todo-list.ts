import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../reducers/todos';
import { TodoItem } from './todo-item';

@Component({
  selector: 'todo-list',
  template: `
    <ul id="todo-list">
        <todo-item *ngFor="let todo of todos"
            [todo]="todo"
            (updateTodo)="updateTodo.emit($event)"
            (toggleTodo)="toggleTodo.emit($event)"
            (deleteTodo)="deleteTodo.emit($event)">
        </todo-item>
    </ul>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [TodoItem]
})
export class TodoList{
  @Input() todos : Todo[];
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

}
