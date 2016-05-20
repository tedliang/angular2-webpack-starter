import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../reducers/todos';

@Component({
  selector: 'todo-item',
  template: `
    <li [ngClass]="{completed: todo.completed, editing: editing}">
      <div class="view">
        <input class="toggle" type="checkbox" 
            (change)="toggleTodo.emit(todo)" 
            [checked]="todo.completed">
        <label (dblclick)="editTodo()">{{todo.text}}</label>
        <button class="destroy" (click)="deleteTodo.emit(todo)"></button>
      </div>
      <input class="edit" #edited *ngIf="editing" 
        [value]="todo.text" 
        (blur)="updateEditing(todo, edited.value)" 
        (keyup.enter)="stopEditing()" 
        (keyup.escape)="cancelEditing(todo, edited)">
    </li>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItem{

  @Input() todo: Todo;
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  editing: boolean = false;

  editTodo() {
    this.editing = true;
  }

  cancelEditing(todo: Todo, input) {
    input.value = todo.text;
    this.editing = false;
  }

  stopEditing() {
    this.editing = false;
  }

  updateEditing(todo: Todo, text: string) {
    this.editing = false;

    text = text.trim();
    if (text.length === 0) {
      this.deleteTodo.emit(todo);
    }
    else if (todo.text !== text) {
      this.updateTodo.emit(Object.assign({}, todo, {
        text: text
      }));
    }
  }

}
