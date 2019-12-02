import 'todomvc-common';
import TodoStore from './stores/TodoStore';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';

const initialState = window.initialState && JSON.parse(window.initialState) || {};

var todoStore = TodoStore.fromJS(initialState.todos || []);

todoStore.subscribeServerToStore();

ReactDOM.render(
	<TodoApp todoStore={todoStore}/>,
	document.getElementById('todoapp')
);

if (module.hot) {
  module.hot.accept('./components/todoApp', () => {
    var NewTodoApp = require('./components/todoApp').default;
    ReactDOM.render(
      <NewTodoApp todoStore={todoStore}/>,
      document.getElementById('todoapp')
    );
  });
}

