import React, { Component } from 'react';
import { Button, Input, Dropdown } from "semantic-ui-react";
import axios from 'axios';
import Import from '../import/import';
import Update from '../update/update';
import Delete from '../delete/delete';
import'../button.scss'

import AnalysisTable from '../analysisTable/analysisTable'; 
import Table from '../table/table'; 

import './search.scss';

const sortOptions = [
  { key: 'title', text: 'Title', value: 'title' },
  { key: 'views', text: 'Views', value: 'views' },
  { key: 'trendingDate', text: 'TrendingDate', value: 'trendingDate' },
  { key: 'categoryId', text: 'CategoryName', value: 'categoryId' },
  { key: 'channelTitle', text: 'ChannelName', value: 'channelTitle' },
];

class Search extends Component {
  
  constructor() {
    super();

    this.state = {
      value: '',
      videoList: [],
      sort: 'name',
      order: 'Ascending',
      showAnalysis: false,
      controversial: false,
      popular: false
    };

    this.baseUrl = 'http://localhost:8000/videos/';
    this.searchHandler = this.searchHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.sortHandler = this.sortHandler.bind(this);
    this.orderHandler = this.orderHandler.bind(this);
    this.analysisDisplay = this.analysisDisplay.bind(this);
    this.controversialDisplay = this.controversialDisplay.bind(this);
    this.showPopular = this.showPopular.bind(this);
  }

  componentDidMount() {
    // Fetch videos when the component mounts
    this.clickHandler();
  }

  analysisDisplay() {
    this.setState(prevState => ({ showAnalysis: !prevState.showAnalysis }));
    this.clickHandler();
  }

  controversialDisplay() {
    this.setState(prevState => ({ controversial: !prevState.controversial }));
    this.clickHandler();
  }

  showPopular() {
    this.setState(prevState => ({ popular: !prevState.popular }));
    this.clickHandler();
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
      var videosData = videosResponse.data;

      // Filter videosData based on badVideos IDs
      if (this.state.controversial) {
        // Fetch bad videos for review
        const badVideosResponse = await axios.get('http://localhost:8000/statistics/for_review/');
        const badVideos = badVideosResponse.data.videos_for_review;
        videosData = videosData.filter(video => badVideos.includes(video.video_id));
      } 
      if (this.state.popular) {
        const popularVideosResponse = await axios.get('http://localhost:8000/videos/get_popular_videos/');
        const popularVideos = popularVideosResponse.data.map(video => video.video_id);
        videosData = videosData.filter(video => popularVideos.includes(video.video_id));
      }

      const statsData = statsResponse.data;
      const youtubersData = youtubersResponse.data;
      const categoriesData = categoriesResponse.data;

      const mergedData = this.state.showAnalysis && !this.state.popular && !this.state.controversial ? statsData.map(stat => {
        const video = videosData.find(video => video.video_id === stat.video);
        const youtuber = youtubersData.find(youtuber => youtuber.channel_id === video.channel);
        const category = categoriesData.find(cat => cat.category_id === video.category);
        return { ...stat, ...video, ...youtuber, ...category};
      }) : videosData.map(video => {
        const stats = statsData.find(stat => stat.video === video.video_id);
        const youtuber = youtubersData.find(youtuber => youtuber.channel_id === video.channel);
        const category = categoriesData.find(cat => cat.category_id === video.category);
        return { ...video, ...stats, ...youtuber, ...category};
      });;
  
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
  
    const deletePromises = videoList.map(video => {
      // Check if the video has a valid id
      if (video.video_id) {
        return axios.delete(`http://localhost:8000/videos/${video.video_id}/`);
      } else {
        // If no valid id, log an error or handle as appropriate
        console.error('Invalid video ID:', video);
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
    return (
      <div>
        <div className="search-container">
          <div className="searchbar">
            <Input
              onChange={this.searchHandler}
              placeholder='Search for YouTube Title'
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

        <div className="button-container">
          <Import />
          <Update />
          <button onClick={this.analysisDisplay} className='interactive-button'>
          {this.state.showAnalysis ? 'Back to Default' : 'Go to Analysis'}
          </button>
          <button
            onClick={this.controversialDisplay}
            className='interactive-button'
          >
            {this.state.controversial ? 'Hide Controversial Videos' : 'Show Controversial Videos'}
          </button>
          <button
            onClick={this.showPopular}
            className='interactive-button'
          >
            {this.state.popular ? 'Hide Popular Videos' : 'Show Popular Videos'}
          </button>
        </div>
        {/* <Table youtubeData={this.state.videoList} /> */}
        {this.state.showAnalysis ? <AnalysisTable youtubeData={this.state.videoList}/> : <Table youtubeData={this.state.videoList} /> }
      </div>
    );
  }
}

export default Search;
