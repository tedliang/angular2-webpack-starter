import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.service';
import { Todo } from '../reducers/todos';
import {
  SET_VISIBILITY_FILTER, SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED,
  UNDO, REDO,
  ADD_TODO, UPDATE_TODO,
  TOGGLE_TODO, TOGGLE_ALL_TODO,
  DELETE_TODO, CLEAR_COMPLETED_TODO
} from '../constants';

@Injectable()
export class TodosActions {

  public todos$: Observable<Todo[]>;

  constructor(
    private store : Store<any>,
    private appState: AppState
  ){
    const subState$ = store.select(state => ({
      todos: state.todos.present,
      filter: state.visibilityFilter
    }));
    this.todos$ = subState$.map(state => this.visibleTodos(state.todos, state.filter));
    subState$.subscribe(function (state) {
      appState.set('todos', state.todos);
      appState.set('filter', state.filter);
    });
  }

  addTodo(text: string){
    this.store.dispatch({type: ADD_TODO, payload: {id: new Date().getTime(), text, completed: false}});
  }

  toggleTodo(todo: Todo){
    this.store.dispatch({type: TOGGLE_TODO, payload: todo});
  }

  updateTodo(todo: Todo){
    this.store.dispatch({type: UPDATE_TODO, payload: todo});
  }

  deleteTodo(todo: Todo){
    this.store.dispatch({type: DELETE_TODO, payload: todo});
  }

  allCompleted(): boolean{
    return this.store.getState().todos.present.every(t => t.completed);
  }

  activeCount(): number{
    return this.store.getState().todos.present.filter(t => !t.completed).length;
  }

  toggleAll(completed: boolean) {
    this.store.dispatch({type: TOGGLE_ALL_TODO, payload: completed});
  }

  clearCompleted() {
    this.store.dispatch({type: CLEAR_COMPLETED_TODO});
  }

  undo() {
    this.store.dispatch({type: UNDO});
    return false;
  }

  redo() {
    this.store.dispatch({type: REDO});
    return false;
  }

  hasUndo(): boolean {
    return this.store.getState().todos.past.length > 0;
  }

  hasRedo(): boolean {
    return this.store.getState().todos.future.length > 0;
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
