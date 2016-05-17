import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Todo } from '../reducers/todos';

@Injectable()
export class TodosViewModel{
  public filter$ : Observable<string>;
  public todos$ : Observable<Todo[]>;
  public totalTodos$ : Observable<number>;
  public activeTodos$ : Observable<number>;
  public completedTodos$ : Observable<number>;

  constructor(
    private store: Store<any>
  ){
    const viewModel$ = Observable.combineLatest(
      store.select('todos'),
      store.select('visibilityFilter'),
      (todos : Array<Todo>, visibilityFilter : string) => {
        let totalTodos = todos.length;
        let completedTodos = todos.filter((todo : Todo) => todo.completed).length;
        return {
          filter: visibilityFilter,
          todos: this.visibleTodos(todos, visibilityFilter),
          totalTodos: totalTodos,
          activeTodos: totalTodos - completedTodos,
          completedTodos: completedTodos
        }
      }
    ).share();
    //expose to view
    this.filter$ = viewModel$.map(vm => vm.filter);
    this.todos$ = viewModel$.map(vm => vm.todos);
    this.totalTodos$ = viewModel$.map(vm => vm.totalTodos);
    this.activeTodos$ = viewModel$.map(vm => vm.activeTodos);
    this.completedTodos$ = viewModel$.map(vm => vm.completedTodos);
  }

  private visibleTodos(todos : Array<Todo>, filter: string) : Todo[]{
    switch (filter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
    }
  }
}
