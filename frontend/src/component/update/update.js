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
        this.processVideosData(videosData, file.name);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }

  processVideosData(videosData, fileName) {
    console.log("Sending video data:", videosData); // Log the data being sent

    if (fileName.toLowerCase() === 'video.txt') {
      axios.put(`http://localhost:8000/videos/${videosData.video_id}/`, videosData)
        .then(response => {
          console.log("Videos changed successfully:", response.data);
        })
        .catch(error => {
          console.error("Error adding videos:", error);
        });
    } else if (fileName.toLowerCase() === 'statistic.txt') {
      axios.put(`http://localhost:8000/statistics/${videosData.statistics_id}/`, videosData)
        .then(response => {
          console.log("Videos changed successfully:", response.data);
        })
        .catch(error => {
          console.error("Error adding videos:", error);
        });
    } else if (fileName.toLowerCase() === 'youtuber.txt') {
      axios.put(`http://localhost:8000/youtubers/${videosData.channel_id}/`, videosData)
        .then(response => {
          console.log("Videos changed successfully:", response.data);
        })
        .catch(error => {
          console.error("Error adding videos:", error);
        });
    } else {
      console.error("Invalid file name. Only 'video', 'statistic' or 'youtuber' file is allowed.");
    }
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
