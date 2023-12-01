import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './tableView.scss';

class tableView extends Component {
  render() {
    const { youtubeData } = this.props;

    if (!youtubeData || youtubeData.length === 0) {
      return (
        <div className="noResults">
          <h3>No data found.</h3>
        </div>
      );
    } else {
      return (
        <List divided verticalAlign='middle'>
          {youtubeData.map((video, index) => (
            <List.Item key={index} className="listItem">
              <Image src={video.thumbnail_url} avatar />
              <List.Content>
                <List.Header>
                  <Link to={`/video/${video.video_id}`}>{video.video_title}</Link>
                </List.Header>
                <List.Description>
                  <p>Views: {video.views}</p>
                  <p>Trending Date: {video.trending_date}</p>
                  <p>Category ID: {video.category_id}</p>
                  <p>Channel Title: {video.channel_title}</p>
                  {/* Change above once table frame is finished */}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      );
    }
  }
}

tableView.propTypes = {
    youtubeData: PropTypes.arrayOf(
    PropTypes.shape({
      video_title: PropTypes.number,
      views: PropTypes.number,
      trending_data: PropTypes.string,
      category_id: PropTypes.string,
      channel_title: PropTypes.string,
      views_likes_ratio: PropTypes.string,
      click_rate: PropTypes.number,
      tags: PropTypes.string
    })
  ),
};

export default tableView;