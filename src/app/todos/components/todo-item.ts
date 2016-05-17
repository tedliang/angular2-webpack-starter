import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../reducers/todos';

@Component({
  selector: 'todo-item',
  template: `
    <li [ngClass]="{completed: todo.completed}">
      <div class="view">
        <input class="toggle" type="checkbox" 
            (change)="toggleTodo.emit(todo)" 
            [checked]="todo.completed">
        <label>{{todo.text}}</label>
        <button class="destroy" (click)="deleteTodo.emit(todo)"></button>
      </div>
    </li>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItem{
  @Input() todo: Todo;
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
}
