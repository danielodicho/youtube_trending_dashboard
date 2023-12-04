import React, { Component } from 'react';
import { Button, Input, Dropdown } from "semantic-ui-react";
import axios from 'axios';
import Import from '../import/import';
import Table from '../table/table'; 

import './search.scss';

const sortOptions = [
  { key: 'title', text: 'Title', value: 'title' },
  { key: 'views', text: 'Views', value: 'views' },
  { key: 'trendingDate', text: 'TrendingDate', value: 'trendingDate' },
  { key: 'categoryId', text: 'CategoryId', value: 'categoryId' },
  { key: 'channelTitle', text: 'ChannelTitle', value: 'channelTitle' },
];

class Search extends Component {
  
  constructor() {
    super();

    this.state = {
      value: '',
      videoList: [],
      sort: 'name',
      order: 'Ascending',
    };

    this.baseUrl = 'http://localhost:8000/videos/';
    this.searchHandler = this.searchHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.sortHandler = this.sortHandler.bind(this);
    this.orderHandler = this.orderHandler.bind(this);
  }

  componentDidMount() {
    // Fetch videos when the component mounts
    this.clickHandler();
  }

  async clickHandler() {
    try {
      const response = await axios.get(this.baseUrl);
      const videoList = response.data;

      // Apply search filter if any
      const filteredList = videoList.filter(video =>
        video.title.toLowerCase().includes(this.state.value.toLowerCase())
      );

      // Sort and order the list
      this.sortAndOrderVideos(filteredList);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  sortAndOrderVideos(videoList) {
    // Sort logic based on the state
    if (this.state.sort === "title") {
      videoList.sort((a, b) => a.title.localeCompare(b.video_title));
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

  render() {
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

        <Import />

        <Table youtubeData={this.state.videoList} />
      </div>
    );
  }
}

export default Search;
