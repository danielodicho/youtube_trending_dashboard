import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './table.scss';

class Table extends Component {
  render() {
    const { youtubeData } = this.props; // Use the data passed as props

    return (
      <div className="tableContainer">
        <div className="tableHeader">
          {/* Each of these sections maps over the youtubeData array */}
          <div className="columnHeader">
            <span>Title</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.title}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Views</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.views}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Trending Date</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.trending_date}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Category ID</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.category_id}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Channel Title</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.channel_title}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Views/Likes Ratio</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.views_likes_ratio}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Click Rate</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.click_rate}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Tags</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.tags}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// Uncomment and update PropTypes
Table.propTypes = {
  youtubeData: PropTypes.arrayOf(
    PropTypes.shape({
      video_title: PropTypes.string,
      views: PropTypes.number,
      trending_date: PropTypes.string,
      category_id: PropTypes.string,
      channel_title: PropTypes.string,
      views_likes_ratio: PropTypes.string,
      click_rate: PropTypes.number,
      tags: PropTypes.string,
    })
  ),
};

export default Table;
