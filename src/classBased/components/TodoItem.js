/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from './TodoItem.module.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  componentWillUnmount() {
    window.console.log('Cleaning up....');
  }

  handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      this.setState({
        editing: false,
      });
    }
  };

  handleEdit = () => {
    this.setState({
      editing: true,
    });
  };

  render() {
    const completedStyle = {
      fontStyle: 'italic',
      color: '#595959',
      opacity: 0.4,
      textDecoration: 'line-through',
    };
    const { id, title, completed } = this.props.todo;
    const viewMode = {};
    const editMode = {};

    if (this.state.editing) {
      viewMode.display = 'none';
    } else {
      editMode.display = 'none';
    }
    return (
      <li key={id} className={styles.item}>
        <div onDoubleClick={this.handleEdit} style={viewMode}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => {
              this.props.handleChangeProps(id);
            }}
          />
          <button
            type="button"
            onClick={() => {
              this.props.deleteTodoProps(id);
            }}
          >
            Delete
          </button>
          <span style={completed ? completedStyle : null}>{title}</span>
        </div>
        <input
          type="text"
          className={styles.textInput}
          style={editMode}
          value={title}
          onKeyDown={this.handleUpdatedDone}
          onChange={(e) => {
            this.props.setUpdate(e.target.value, id);
          }}
        />
      </li>
    );
  }
}

export default TodoItem;
