import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import List from './components/List';

const bulktodos = () => {
  const todos = [];
  for (let i = 1; i < 5; i++) {
    todos.push({
      id: i,
      text: `testMessage ${i}`,
      done: false,
      edit: false,
    });
  }
  return todos;
};
class App extends Component {
  state = {
    todos: bulktodos(),
  };
  id = 5;

  handleSubmit = (text) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => ({ ...todo, edit: false })),
    }));
    this.setState((prevState) => ({
      todos: prevState.todos.concat({
        id: this.id,
        text,
        done: false,
        edit: false,
      }),
    }));
    this.id++;
  };

  handleCheck = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    }));
  };

  handleRemove = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  };

  handleEdit = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id && todo.done !== true
          ? { ...todo, edit: !todo.edit }
          : { ...todo, edit: false }
      ),
    }));
  };

  handleModify = (id, text) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, text, edit: false, done: false } : todo
      ),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="App">
        <h3>TODO LIST</h3>
        <Form onInsert={this.handleSubmit} />
        <List
          todos={todos}
          onCheck={this.handleCheck}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
          onModify={this.handleModify}
        />
      </div>
    );
  }
}

export default App;
