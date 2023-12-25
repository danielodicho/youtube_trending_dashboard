import React from 'react';
import axios from 'axios';
import '../button.scss';

class Import extends React.Component {
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
  
        if (this.isVideoDataValid(videosData)) {
          this.processVideosData(videosData, file.name);
        } else {
          console.error("Invalid video data format");
        }
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
  
    reader.readAsText(file);
  }

  isVideoDataValid(videosData) {
    // Check if the imported data matches the expected structure for a single video information
    return videosData && !Array.isArray(videosData);
  }

  processVideosData(videosData, fileName) {
    console.log(videosData);
    // Check if the file name is 'videos' before making the axios post request
    if (fileName.toLowerCase() === 'video.txt') {
      axios.post('http://localhost:8000/videos/', videosData)
        .then(response => {
          console.log("Videos added successfully:", response.data);
        })
        .catch(error => {
          console.error("Error adding videos:", error);
        });
    } else if (fileName.toLowerCase() === 'statistic.txt') {
      axios.post('http://localhost:8000/statistics/', videosData)
        .then(response => {
          console.log("Videos added successfully:", response.data);
        })
        .catch(error => {
          console.error("Error adding videos:", error);
        });
    } else if (fileName.toLowerCase() === 'youtuber.txt') {
      axios.post('http://localhost:8000/youtubers/', videosData)
        .then(response => {
          console.log("Videos added successfully:", response.data);
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
      <div className="interactive-container">
        <button
          id="import-button"
          className="import-button"
          onClick={() => {
            this.fileInputRef.current.click();
            this.handleClick();
          }}
        >
          Import Video
        </button>
        <input
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          ref={this.fileInputRef}
          key={this.state.file} // Reset the input when key changes
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default Import;
