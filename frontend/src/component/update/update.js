import React from 'react';
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

  processVideosData(videosData) {
    // Here you can access the fields like video_title, views, trending_data, etc.
    console.log("Video Title:", videosData.video_title);
    console.log("Views:", videosData.views);
    console.log("Trending Data:", videosData.trending_data);
    console.log("Category ID:", videosData.category_id);
    console.log("Channel Title:", videosData.channel_title);
    console.log("Views Likes Ratio:", videosData.views_likes_ratio);
    console.log("Click Rate:", videosData.click_rate);
    console.log("Tags:", videosData.tags);

    // Insert video to database here???
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
          key={this.state.file} // Reset the input when key changes
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default Update;
