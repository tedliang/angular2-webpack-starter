import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  SET_VISIBILITY_FILTER, SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED,
  ADD_TODO, TOGGLE_TODO, DELETE_TODO
} from '../constants';
import { Todo } from "../reducers/todos";

@Injectable()
export class TodosActions {

  public todos$: Observable<Todo[]>;

  constructor(private store : Store<any>){
    this.todos$ = store.select(state => ({
      todos: state.todos,
      filter: state.visibilityFilter
    })).map(vm => this.visibleTodos(vm.todos, vm.filter));
  }

  addTodo(text: string){
    this.store.dispatch({type: ADD_TODO, payload: {id: new Date().getTime(), text, completed: false}});
  }

  toggleTodo(todo : Todo){
    this.store.dispatch({type: TOGGLE_TODO, payload: todo});
  }

  deleteTodo(todo : Todo){
    this.store.dispatch({type: DELETE_TODO, payload: todo});
  }

  setVisibilityFilter(filter: string){
    this.store.dispatch({type: SET_VISIBILITY_FILTER, payload: filter});
  }

  getVisibilityFilter(): string{
    return this.store.getState().visibilityFilter;
  }

  private visibleTodos(todos : Todo[], filter: string) : Todo[]{
    switch (filter) {
      case SHOW_ALL:
        return todos;
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      case SHOW_ACTIVE:
        return todos.filter(t => !t.completed);
    }
  }

}
