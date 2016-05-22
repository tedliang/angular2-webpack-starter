import { Reducer, Action } from '@ngrx/store';

import {
  ADD_TODO, UPDATE_TODO,
  TOGGLE_TODO, TOGGLE_ALL_TODO,
  DELETE_TODO, CLEAR_COMPLETED_TODO
} from '../constants';

export interface Todo {
  id: number,
  text: string,
  completed: boolean
}

const todo : Reducer<Todo> = (state : Todo, action: Action) => {
  switch(action.type) {
    case ADD_TODO:
      return {
        id: action.payload.id,
        text: action.payload.text,
        completed: action.payload.completed
      };
    case UPDATE_TODO:
      if (state.id !== action.payload.id) {
        return state;
      }
      return action.payload;
    case TOGGLE_TODO:
      if(state.id !== action.payload.id){
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
      });
    case TOGGLE_ALL_TODO:
      if (state.completed === action.payload) {
        return state;
      }
      return Object.assign({}, state, {
        completed: action.payload
      });
    default:
      return state;
  }
};

export const todos : Reducer<Todo[]> = (state : Todo[] = [], action: Action) => {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case UPDATE_TODO:
    case TOGGLE_TODO:
    case TOGGLE_ALL_TODO:
      return state.map(t => todo(t, action));
    case DELETE_TODO:
      return state.filter(t => t.id !== action.payload.id);
    case CLEAR_COMPLETED_TODO:
      return state.filter(t => !t.completed);
    default:
      return state;
  }
};
