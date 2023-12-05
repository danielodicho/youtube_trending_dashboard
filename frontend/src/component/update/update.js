import React from 'react';
import axios from 'axios';
import './update.scss';

class Update extends React.Component {
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

  readFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      try {
        const videosData = JSON.parse(content);
        this.processVideosData(videosData);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }

  processVideosData(video) {
    console.log("Sending video data:", video); // Log the data being sent
  
    axios.put(`http://localhost:8000/videos/${video.video_id}/`, video)
      .then(response => {
        console.log(`Video with ID ${video.video_id} updated successfully.`, response);
      })
      .catch(error => {
        console.error(`Error updating video with ID ${video.video_id}:`, error.response.data);
      });
  }  

  render() {
    return (
      <div className="import-container">
        <button
          id="import-button"
          className="import-button"
          onClick={() => {
            this.fileInputRef.current.click();
            this.handleClick();
          }}
        >
          Update Video
        </button>
        <input
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          ref={this.fileInputRef}
          key={this.state.file}
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default Update;
