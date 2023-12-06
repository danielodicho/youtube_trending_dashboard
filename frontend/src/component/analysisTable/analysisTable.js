import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './analysisTable.scss';

class AnalysisTable extends Component {
  render() {
    const { youtubeData } = this.props; // Use the data passed as props

    const sortedData = youtubeData.sort((a, b) => {
      return a.video_id.localeCompare(b.video_id) || new Date(a.trending_date) - new Date(b.trending_date);
    });

    // Calculate daily views gained
    const dataWithDailyViews = sortedData.map((data, index, array) => {
      // Check if the current entry is the same video as the previous entry
      if (index > 0 && data.video_id === array[index - 1].video_id) {
        // Calculate the difference in views
        const dailyViewsGained = data.view_count - array[index - 1].view_count;
        return { ...data, dailyViewsGained };
      }
      // For the first entry of each video, there's no previous day to compare to
      return { ...data, dailyViewsGained: 'N/A' };
    });

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
            <span>Views (Daily Gain)</span>
            {dataWithDailyViews.map((data, index) => (
              <div key={index}>
                {data.view_count} 
                {data.dailyViewsGained !== 'N/A' && (
                  <span> (+{data.dailyViewsGained})</span>
                )}
              </div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Trending Date</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.trending_date}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Published Date</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.publishedAt}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Category Name</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.category_name}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Channel Name</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.channel_title !== undefined ? data.channel_title.slice(0, -2) : ''}</div>
            ))}
          </div>
          <div className="columnHeader">
            <span>Views/Likes Ratio</span>
            {youtubeData.map((data, index) => (
              <div key={index}>{data.view_count / data.likes}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// Uncomment and update PropTypes
AnalysisTable.propTypes = {
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

export default AnalysisTable;
