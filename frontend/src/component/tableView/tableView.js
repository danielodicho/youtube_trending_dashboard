import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './tableView.scss';

class tableView extends Component {
  render() {
    const hardcodedData = [
      {
        video_id: '1',
        video_title: 'Video 1',
        views: 1000,
        trending_date: '2023-01-01',
        category_id: 'Music',
        channel_title: 'Channel 1',
        views_likes_ratio: '0.75',
        click_rate: 10,
        tags: 'music, entertainment',
        thumbnail_url: 'https://example.com/thumbnail1.jpg',
      },
      {
        video_id: '2',
        video_title: 'Video 2',
        views: 500,
        trending_date: '2023-01-02',
        category_id: 'Gaming',
        channel_title: 'Channel 2',
        views_likes_ratio: '0.65',
        click_rate: 8,
        tags: 'gaming, fun',
        thumbnail_url: 'https://example.com/thumbnail2.jpg',
      },
      // Add more video entries as needed
    ];

    return (
      <List divided verticalAlign='middle' className="tableViewContainer">
        {hardcodedData.map((video, index) => (
          <List.Item key={index} className="listItem">
            <Image src={video.thumbnail_url} avatar />
            <List.Content>
              <List.Header>
                <Link to={`/video/${video.video_id}`}>{video.video_title}</Link>
              </List.Header>
              <List.Description>
                <div className="infoContainer">
                  <div className="infoItem">{video.video_title}</div>
                  <div className="infoItem">{video.views}</div>
                  <div className="infoItem">{video.trending_date}</div>
                  <div className="infoItem">{video.category_id}</div>
                  <div className="infoItem">{video.channel_title}</div>
                  <div className="infoItem">{video.views_likes_ratio}</div>
                  <div className="infoItem">{video.click_rate}</div>
                  <div className="infoItem">{video.tags}</div>
                </div>
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
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