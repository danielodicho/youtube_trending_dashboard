import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableView from '../tableView/tableView';
import { Dropdown } from 'semantic-ui-react';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      youtubeData: props.youtubeData,
      sortColumn: null,
      sortOrder: null, 
    };
  }

  handleSort = (column) => {
    const { youtubeData, sortColumn, sortOrder } = this.state;
    const nextSortOrder = column === sortColumn && sortOrder === 'asc' ? 'desc' : 'asc';

    const sortedData = youtubeData.sort((a, b) => {
      if (a[column] < b[column]) {
        return nextSortOrder === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return nextSortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.setState({
      youtubeData: sortedData,
      sortColumn: column,
      sortOrder: nextSortOrder,
    });
  };

  renderSortDropdown(column) {
    return (
      <Dropdown
        inline
        header='Adjust sort direction'
        className='icon'
        icon='sort'
        options={[
          { key: 'ascending', text: 'Ascending', value: 'asc' },
          { key: 'descending', text: 'Descending', value: 'desc' }
        ]}
        onChange={() => this.handleSort(column)}
        value={this.state.sortOrder}
      />
    );
  }

  render() {
    const { youtubeData } = this.state;
    return (
      <div className="tableContainer">
        <div className="tableHeader">
          <div>Title {this.renderSortDropdown('video_title')}</div>
          <div>Views {this.renderSortDropdown('views')}</div>
          <div>Trending Date {this.renderSortDropdown('trending_date')}</div>
          <div>Category ID {this.renderSortDropdown('category_id')}</div>
          <div>Channel Title {this.renderSortDropdown('channel_title')}</div>
          <div>Views/Likes Ratio {this.renderSortDropdown('views_likes_ratio')}</div>
          <div>Click Rate {this.renderSortDropdown('click_rate')}</div>
          <div>Tags {this.renderSortDropdown('tags')}</div>
        </div>
        <TableView youtubeData={youtubeData} />
      </div>
    );
  }
}

Table.propTypes = {
  youtubeData: PropTypes.arrayOf(
    PropTypes.shape({
      video_title: PropTypes.string,
      views: PropTypes.number,
      trending_date: PropTypes.string,
      category_id: PropTypes.string,
      channel_title: PropTypes.string,
      views_likes_ratio: PropTypes.string,
      click_rate: PropTypes.number,
      tags: PropTypes.string
    })
  ),
};

export default Table;
