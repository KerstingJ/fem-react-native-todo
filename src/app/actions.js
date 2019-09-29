import { BASE_URL } from "../../config";

export const GET_TODOS = "GET_TODOS";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";

export const getTodos = () => dispatch => {
  dispatch({
    type: GET_TODOS
  });

  fetch(`${BASE_URL}/todos`, {
    headers: {
      Accept: "application/json"
    },
    method: "GET"
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_TODOS_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_TODOS_FAILURE,
        payload: err
      });
    });
};

export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

export const addTodo = newTodo => dispatch => {
  dispatch({
    type: ADD_TODO
  });

  fetch(`${BASE_URL}/todos`, {
    method: "post",
    body: JSON.stringify({
      text: newTodo,
      isComplete: false
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: ADD_TODO_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_TODO_FAILURE,
        payload: err
      });
    });
};
