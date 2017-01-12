import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { compose } from '@ngrx/core/compose';
import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';

import { APP_REDUCERS } from './reducers';
import { TodoApp } from './todos.component';
import { TodoItem } from './components/todo-item';
import { FilterLink } from './components/filter-link';
import { TodoList } from './components/todo-list';
import { TodosActions } from './actions/todos.actions';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreModule.provideStore(compose(
      localStorageSync(['todos'], true),
      combineReducers
    )(APP_REDUCERS))
  ],
  declarations: [ TodoApp, TodoItem, FilterLink, TodoList ],
  exports:      [ TodoApp ],
  providers:    [ TodosActions ]
})
export class TodosModule {}
