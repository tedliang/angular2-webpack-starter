// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { APP_REDUCERS } from './todos/reducers';
import { APP_ACTIONS } from './todos/actions';

import { provideStore } from '@ngrx/store';
import { instrumentStore } from '@ngrx/devtools';

// Application wide providers
export const APP_PROVIDERS = [
  APP_ACTIONS,
  provideStore(APP_REDUCERS),
  instrumentStore(),
  AppState
];
