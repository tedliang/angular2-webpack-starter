import { Reducer, Action } from '@ngrx/store';
import { SHOW_ALL, SET_VISIBILITY_FILTER } from '../constants';

export const visibilityFilter : Reducer<string> = (state : string = SHOW_ALL, action : Action) => {
  switch(action.type){
    case SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
};
