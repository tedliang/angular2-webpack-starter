import { Reducer, Action } from '@ngrx/store';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../constants';

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
    case TOGGLE_TODO:
      if(state.id !== action.payload.id){
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
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
    case TOGGLE_TODO:
      return state.map(t => todo(t, action));
    case DELETE_TODO:
      return state.filter(t => t.id !== action.payload.id);
    default:
      return state;
  }
};
