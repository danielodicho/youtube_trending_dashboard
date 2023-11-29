// ignore this file for now
import React, { Component } from 'react';
import { Button, Input, Container, Image, Dropdown } from "semantic-ui-react";
import axios from 'axios';
import TableView from '../tableView/tableView';
import { Link } from 'react-router-dom';
import './Search.scss';

const sortOptions = [
  { key: 'title', text: 'Title', value: 'title' }
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
    const response = await axios.get(this.baseUrl);
    const allPokemonEntries = response.data.pokemon_entries;

    const matchedEntries = allPokemonEntries.filter(entry =>
      entry.pokemon_species.name.toLowerCase().includes(this.state.value.toLowerCase())
    );

    const matchedPokemonData = matchedEntries.map(entry => ({
      entry_number: entry.entry_number,
      pokemon_species: {
        name: entry.pokemon_species.name,
        url: entry.pokemon_species.url,
      },
    }));
    if (this.state.sort === "name") {
      matchedPokemonData.sort((a, b) => a.pokemon_species.name.localeCompare(b.pokemon_species.name));
    }
    
    if (this.state.order === "Descending") {
      matchedPokemonData.reverse();
    }

    this.setState({
      matchedPokemon: matchedPokemonData,
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

  render() {
    return (
      <div>
        <div className="container">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            className="small-image"
          />
        </div>
        <div className="menu">
          <Link to="/">Search</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
        <div className="search-container">
          <div className="searchbar">
            <Input
              onChange={this.searchHandler}
              placeholder='Search a Pokémon here'
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

        <Container className='galleryContainer'>
          <TableView matchedPokemonData={this.state.matchedPokemon} />
        </Container>
      </div>
    );
  }
}

export default Search;