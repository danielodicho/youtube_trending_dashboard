import React, { Component } from 'react';
import './table.scss';

class Table extends Component {
  // Example data for demonstration purposes
  exampleData = [
    {
      video_title: 'Video 1',
      views: 1000,
      trending_date: '2023-01-01',
      category_id: 'Music',
      channel_title: 'Channel 1',
      views_likes_ratio: '0.75',
      click_rate: 10,
      tags: 'music, entertainment',
    },
    {
      video_title: 'Video 2',
      views: 500,
      trending_date: '2023-01-02',
      category_id: 'Gaming',
      channel_title: 'Channel 2',
      views_likes_ratio: '0.65',
      click_rate: 8,
      tags: 'gaming, fun',
    },
    // Add more example data as needed
  ];

  render() {
    return (
      <div className="tableContainer">
        <div className="tableHeader">
          <div className="columnHeader">
            <span>Title</span>
            {this.exampleData.map((data, index) => (
              <div key={index}>{data.video_title}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Views</span>
            {this.exampleData.map((data, index) => (
              <div key={index}>{data.views}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Trending Date</span>
            {this.exampleData.map((data, index) => (
              <div key={index}>{data.trending_date}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Category ID</span>
            {this.exampleData.map((data, index) => (
              <div key={index}>{data.category_id}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Channel Title</span>
            {this.exampleData.map((data, index) => (
              <div key={index}>{data.channel_title}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Views/Likes Ratio</span>
            {this.exampleData.map((data, index) => (
              <div key={index}>{data.views_likes_ratio}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Click Rate</span>
            {this.exampleData.map((data, index) => (
              <div key={index}>{data.click_rate}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Tags</span>
            {this.exampleData.map((data, index) => (
              <div key={index}>{data.tags}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// Table.propTypes = {
//   youtubeData: PropTypes.arrayOf(
//     PropTypes.shape({
//       video_title: PropTypes.string,
//       views: PropTypes.number,
//       trending_date: PropTypes.string,
//       category_id: PropTypes.string,
//       channel_title: PropTypes.string,
//       views_likes_ratio: PropTypes.string,
//       click_rate: PropTypes.number,
//       tags: PropTypes.string,
//     })
//   ),
// };

export default Table;
