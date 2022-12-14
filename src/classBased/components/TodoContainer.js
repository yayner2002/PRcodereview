/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import Header from './Header';
import InputTodo from './InputTodo';

class TodoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    const localStorageData = localStorage.getItem('todos');
    const localStorageDataParsed = JSON.parse(localStorageData);
    if (localStorageDataParsed) {
      this.setState({
        todos: localStorageDataParsed,
      });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.todos !== this.state.todos) {
      const todoData = this.state.todos;
      const localStorageData = JSON.stringify(todoData);
      localStorage.setItem('todos', localStorageData);
    }
  }

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    });
  };

  handleChange = (itemId) => {
    this.setState((previousState) => ({
      todos: previousState.todos.map((todo) => {
        if (todo.id === itemId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  delTodo = (deletedId) => {
    this.setState({
      todos: [
        ...this.state.todos.filter((todo) => todo.id !== deletedId),
      ],
    });
  };

  addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodoList
            setUpdate={this.setUpdate}
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

export default TodoContainer;
