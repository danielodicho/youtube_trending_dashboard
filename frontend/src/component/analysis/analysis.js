import React, { Component } from 'react';
import { Button, Input, Dropdown } from "semantic-ui-react";
import axios from 'axios';
import Import from '../import/import';
import Update from '../update/update';
import Delete from '../delete/delete';
import Search from '../search/search';

import AnalysisTable from '../analysisTable/analysisTable'; 

import './analysis.scss';

const sortOptions = [
  { key: 'title', text: 'Title', value: 'title' },
  { key: 'views', text: 'Views', value: 'views' },
  { key: 'trendingDate', text: 'TrendingDate', value: 'trendingDate' },
  { key: 'categoryId', text: 'CategoryName', value: 'categoryId' },
  { key: 'channelTitle', text: 'ChannelName', value: 'channelTitle' },
];

class Analysis extends Component {
  
  constructor() {
    super();

    this.state = {
      value: '',
      videoList: [],
      sort: 'name',
      order: 'Ascending',
      showAnalysis: false,
    };

    this.baseUrl = 'http://localhost:8000/videos/';
    this.searchHandler = this.searchHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.sortHandler = this.sortHandler.bind(this);
    this.orderHandler = this.orderHandler.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentDidMount() {
    // Fetch videos when the component mounts
    this.clickHandler();
  }

  toggleDisplay() {
    this.setState(prevState => ({ showAnalysis: !prevState.showAnalysis }));
  }

  async clickHandler() {
    try {
      // Fetch data from all endpoints
      const [videosResponse, statsResponse, youtubersResponse, categoriesResponse] = await Promise.all([
        axios.get('http://localhost:8000/videos/'),
        axios.get('http://localhost:8000/statistics/'),
        axios.get('http://localhost:8000/youtubers/'),
        axios.get('http://localhost:8000/categories/')
      ]);
  
      // Extract data from responses
      const videosData = videosResponse.data;
      const statsData = statsResponse.data;
      const youtubersData = youtubersResponse.data;
      const categoriesData = categoriesResponse.data;
  
      // Merge videos with statistics, youtubers, and categories
      const mergedData = statsData.map(stat => {
        const video = videosData.find(video => video.video_id === stat.video);
        const youtuber = youtubersData.find(youtuber => youtuber.channel_id === video.channel);
        const category = categoriesData.find(cat => cat.category_id === video.category);
        return { ...stat, ...video, ...youtuber, ...category};
      });
  
      // Apply search filter and update state
      const filteredList = mergedData.filter(video =>
        video.title && video.title.toLowerCase().includes(this.state.value.toLowerCase())
      );

      this.sortAndOrderVideos(filteredList);
  
      this.setState({ videoList: filteredList });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  sortAndOrderVideos(videoList) {
    // Sort logic based on the state
    if (this.state.sort === "title") {
      videoList.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (this.state.sort === "views") {
      videoList.sort((a, b) => a.view_count - b.view_count);
    }
    if (this.state.sort === "trendingDate") {
      videoList.sort((a, b) => new Date(a.trending_date) - new Date(b.trending_date));
    }
    if (this.state.sort === "categoryId") {
      // Check if the properties exist before using localeCompare
      videoList.sort((a, b) => (a.category_name || '').localeCompare(b.category_name || ''));
    }
    if (this.state.sort === "channelTitle") {
      // Check if the properties exist before using localeCompare
      videoList.sort((a, b) => (a.channel_title || '').localeCompare(b.channel_title || ''));
    }
    // Add other sort options as needed
  
    if (this.state.order === "Descending") {
      videoList.reverse();
    }
  
    this.setState({
      videoList: videoList,
    });
  }

  searchHandler(event) {
    this.setState({ value: event.target.value }, () => {
      this.clickHandler();
    });
  }

  sortHandler(_, data) {
    this.setState({ sort: data.value }, () => {
      this.clickHandler();
    });
  }

  orderHandler(e) {
    const orderValue = e.target.value;
    this.setState({ order: orderValue }, () => {
      this.clickHandler();
    });
  }

  handleImport = (importedData) => {
    console.log('Imported JSON data:', importedData);
    // Handle the imported data
  };

  handleDelete = async () => {
    const { videoList } = this.state;
  
    const deletePromises = videoList.map(stats => {
      // Check if the video has a valid id
      if (stats.video) {
        return axios.delete(`http://localhost:8000/statistics/${stats.statistic_id}/`);
      } else {
        // If no valid id, log an error or handle as appropriate
        console.error('Invalid stat ID:', stats);
        return Promise.resolve(); // Resolve the promise to continue with other deletions
      }
    });
  
    try {
      await Promise.all(deletePromises);
      this.setState({ videoList: [] });
      console.log('All valid videos have been deleted successfully.');
    } catch (error) {
      console.error('Error deleting videos:', error);
    }
  };  

  render() {
    if (this.state.showAnalysis) {
      return <Search />;
    }
    return (
      <div>
        <div className="search-container">
          <div className="searchbar">
            <Input
              onChange={this.searchHandler}
              placeholder='Search for YouTuber here'
              value={this.state.value}
              className="searchbar-input"
            />
            <Button className='search-button' onClick={this.clickHandler}>Search</Button>
            <Delete onClick={this.handleDelete} />
          </div>
        </div>
        <div className='sort-dropdown'>
          <Dropdown
            placeholder="Sort by"
            selection
            options={sortOptions}
            onChange={this.sortHandler}
            value={this.state.sort}
          />
        </div>

        <div className='order-radio'>
          <span>
            <label>
              <input
                type="radio"
                value="Ascending"
                checked={this.state.order === "Ascending"}
                onChange={this.orderHandler}
              />
              Ascending
            </label>
          </span>

          <span>
            <label>
              <input
                type="radio"
                value="Descending"
                checked={this.state.order === "Descending"}
                onChange={this.orderHandler}
              />
              Descending
            </label>
          </span>
        </div>

        <div className="import-update-container">
          <Import />
          <Update />
          <button onClick={this.toggleDisplay} className='import-button'>
            Back to Default
          </button>
        </div>


        <AnalysisTable youtubeData={this.state.videoList} />
      </div>
    );
  }
}

export default Analysis;
