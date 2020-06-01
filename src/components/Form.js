import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  state = {
    input: '',
  };

  render() {
    const { onInsert } = this.props;
    const { input } = this.state;
    return (
      <div className="Form">
        <form
          className="form_container"
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({
              input: '',
            });
            onInsert(input);
          }}
        >
          <input
            placeholder="something to do?"
            onChange={(e) =>
              this.setState({
                input: e.target.value,
              })
            }
            value={input}
          />
          <button>추가</button>
        </form>
      </div>
    );
  }
}

export default Form;
