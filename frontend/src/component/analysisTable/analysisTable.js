import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../table/table.scss';

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
      <div class="table-wrapper">
    <table class="fl-table">
        <thead>
        <tr>
            <th>Title</th>
            <th>Views (Daily Gain)</th>
            <th>Trending Date</th>
            <th>Published Date</th>
            <th>Category</th>
            <th>Channel</th>
            <th>Views/Likes Ratio</th>
        </tr>
        </thead>
        <tbody>
            {dataWithDailyViews.map((data, index) => (
              <tr key={index}>
              <td className="truncate-cell">
                <div className="tooltip-container">
                <span className="truncate-text">{data.title}</span>
                  <span className="tooltip-text">
                    {data.title}
                    <br />
                    <a href={`https://www.youtube.com/watch?v=${data.video_id}`} target="_blank" rel="noopener noreferrer">
                      Watch Video
                      </a>
                    </span>
                  </div>
                  {/* {data.title} */}
                </td>
                <td>{data.view_count} 
                 {data.dailyViewsGained !== 'N/A' && (
                  <span> (+{data.dailyViewsGained})</span>
                )}</td>
                <td>{data.trending_date}</td>
                <td>{data.publishedAt}</td>
                <td>{data.category_name}</td>
                <td className="truncate-cell">{data.channel_title !== undefined ? data.channel_title.slice(0, -2) : ''}</td>
                <td>{data.view_count / data.likes}</td>
              </tr>
            ))}
          </tbody>
    </table>
</div>
    );
  }
}

AnalysisTable.propTypes = {
  youtubeData: PropTypes.arrayOf(
    PropTypes.shape({
      video_title: PropTypes.string,
      video_id: PropTypes.string,
      views: PropTypes.number,
      trending_date: PropTypes.string,
      category_name: PropTypes.string,
      channel_title: PropTypes.string,
      views_likes_ratio: PropTypes.string,
      click_rate: PropTypes.number,
      tags: PropTypes.string,
    })
  ),
};

export default AnalysisTable;