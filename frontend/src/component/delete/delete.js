// delete.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './delete.scss';

class Delete extends React.Component {
  render() {
    return (
      <button className="delete-button" onClick={this.props.onClick}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  }
}

export default Delete;
