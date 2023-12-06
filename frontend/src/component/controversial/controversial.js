import React from 'react';
import axios from 'axios';
import './controversial.scss';

class Controversial extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    };

    this.fileInputRef = React.createRef();
  }

  handleClick = () => {
    // Reset the file input by changing the key
    this.setState({ file: null });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      this.readFile(file);
    }
  };

  render() {
    return (
      <div className="controversial-container">
        <button
          id="controversial-button"
          className="controversial-button"
          onClick={() => {
            this.fileInputRef.current.click();
            this.handleClick();
          }}
        >
          Controversial Videos
        </button>
      </div>
    );
  }
}

export default Controversial;
