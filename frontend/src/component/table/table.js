import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './table.scss';

class Table extends Component {
  render() {
    const { youtubeData } = this.props;

    return (
      <div class="table-wrapper">
    <table class="fl-table">
        <thead>
        <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Trending Date</th>
            <th>Category</th>
            <th>Channel</th>
            <th>Likes</th>
            <th>Comments</th>
        </tr>
        </thead>
        <tbody>
            {youtubeData.map((data, index) => (
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
                <td>{data.view_count}</td>
                <td>{data.trending_date}</td>
                <td>{data.category_name}</td>
                <td className="truncate-cell">{data.channel_title !== undefined ? data.channel_title.slice(0, -2) : ''}</td>
                <td>{data.likes}</td>
                <td>{data.comment_count}</td>
              </tr>
            ))}
          </tbody>
    </table>
</div>
    );
  }
}

Table.propTypes = {
  youtubeData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      video_id: PropTypes.string,
      view_count: PropTypes.number,
      trending_date: PropTypes.string,
      category_name: PropTypes.string,
      channel_title: PropTypes.string,
      likes: PropTypes.number,
      comment_count: PropTypes.number,
    })
  ),
};
export default Table;
