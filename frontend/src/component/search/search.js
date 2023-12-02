import React, { Component } from 'react';
import { Button, Input, Container, Image, Dropdown } from "semantic-ui-react";
import axios from 'axios';
import TableView from '../tableView/tableView';
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
      videoList: null,
      sort: 'name',
      order: 'Ascending',
    };

    // replace with google cloud api
    // this.baseUrl = 'https://pokeapi.co/api/v2/pokedex/national';
    this.searchHandler = this.searchHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.sortHandler = this.sortHandler.bind(this);
    this.orderHandler = this.orderHandler.bind(this);
  }

  componentDidMount() {
    // Automatically call the clickHandler when the component mounts
    this.clickHandler();
  }

  async clickHandler() {
    // const response = await axios.get(this.baseUrl);
    // const allPokemonEntries = response.data.pokemon_entries;

    const matchedEntries = []
    // const matchedEntries = allPokemonEntries.filter(entry =>
    //   entry.pokemon_species.name.toLowerCase().includes(this.state.value.toLowerCase())
    // );

    const videoListSorted = matchedEntries.map(video => ({
      videoTitle: video.videoTitle
      // add more stuff here
    }));
    if (this.state.sort === "title") {
      // Do title sort
      // matchedPokemonData.sort((a, b) => a.pokemon_species.name.localeCompare(b.pokemon_species.name));
    }
    
    if (this.state.order === "Descending") {
      videoListSorted.reverse();
    }

    this.setState({
      videoList: videoListSorted,
    });
  }

  searchHandler(event) {
    this.setState({ value: event.target.value });
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
    // Handle the imported JSON data (e.g., update state with new data)
    console.log('Imported JSON data:', importedData);
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