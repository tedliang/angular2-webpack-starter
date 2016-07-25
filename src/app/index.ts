// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppState } from './app.service';
import { APP_REDUCERS } from './todos/reducers';
import { APP_ACTIONS } from './todos/actions';

import { provideStore, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { localStorageSync } from 'ngrx-store-localstorage';

// Application wide providers
export const APP_PROVIDERS = [
  APP_ACTIONS,
  provideStore(
    compose(
      localStorageSync(['todos'], true),
      combineReducers
    )(APP_REDUCERS)
  ),
  AppState
];
