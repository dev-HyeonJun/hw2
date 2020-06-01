import React, { Component } from 'react';
import './List.css';
import Item from './Item';
class List extends Component {
  render() {
    const { todos, onCheck, onRemove, onEdit, onModify } = this.props;
    return (
      <div className="List">
        {todos.map((todo) => (
          <Item
            key={todo.id}
            todo={todo}
            onCheck={onCheck}
            onRemove={onRemove}
            onEdit={onEdit}
            onModify={onModify}
          >
            {todo.text}
          </Item>
        ))}
      </div>
    );
  }
}

export default List;
