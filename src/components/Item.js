import React, { Component, createRef } from 'react';
import './Item.css';

class Item extends Component {
  state = {
    input: '',
  };

  inputRef = createRef();

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleClick = async (e) => {
    const {
      todo: { text, done, id },
      onEdit,
    } = this.props;
    e.stopPropagation();
    await onEdit(id);
    if (done) return;
    this.setState({
      input: text,
    });
    this.inputRef.current.focus();
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.todo !== nextProps.todo ||
      this.state.input !== nextState.input
    )
      return true;
    return false;
  }

  render() {
    const {
      todo: { text, done, id, edit },
      onCheck,
      onRemove,
      onModify,
    } = this.props;

    return (
      <div
        className={`Item ${done ? 'active' : ''}`}
        onClick={(e) => {
          onCheck(id);
        }}
      >
        <div className="check">&#10004;</div>
        <div className="right">
          {edit ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onModify(id, this.state.input);
              }}
            >
              <input
                ref={this.inputRef}
                value={this.state.input}
                onChange={this.handleChange}
                onClick={(e) => e.stopPropagation()}
              />
              <button className="modify" type="submit">
                APPLY
              </button>
            </form>
          ) : (
            <>
              <div className="text">{text}</div>
              <button className="edit" onClick={this.handleClick}>
                EDIT
              </button>
            </>
          )}
          <button
            className="remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id, this.state.input);
            }}
          >
            REMOVE
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
