import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../constants';
import { Todo } from "../reducers/todos";

@Injectable()
export class TodosActions {
  constructor(private store : Store<any>){}

  addTodo(text: string){
    this.store.dispatch({type: ADD_TODO, payload: {id: new Date().getTime(), text, completed: false}});
  }

  toggleTodo(todo : Todo){
    this.store.dispatch({type: TOGGLE_TODO, payload: todo});
  }

  deleteTodo(todo : Todo){
    this.store.dispatch({type: DELETE_TODO, payload: todo});
  }
}
