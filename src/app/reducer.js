import { combineReducers } from "redux";

import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE
} from "./actions";

const initState = {
  todos: [],
  error: null
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        error: null
      };
    case GET_TODOS_SUCCESS:
      console.log(action);
      return {
        ...state,
        todos: action.payload
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload.message
      };
    case ADD_TODO:
      return {
        ...state,
        error: null
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        error: action.payload.message
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({ todos: todoReducer });
