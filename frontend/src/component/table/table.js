import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableView from '../tableView/tableView';
import { Dropdown } from 'semantic-ui-react';

import './table.scss';

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
          <div className="columnHeader">
            <span>Title</span>
          </div>
          <div className="columnHeader">
            <span>Views</span>
          </div>
          <div className="columnHeader">
            <span>Trending Date</span>
          </div>
          <div className="columnHeader">
            <span>Category ID</span>
          </div>
          <div className="columnHeader">
            <span>Channel Title</span>
          </div>
          <div className="columnHeader">
            <span>Views/Likes Ratio</span>
          </div>
          <div className="columnHeader">
            <span>Click Rate</span>
          </div>
          <div className="columnHeader">
            <span>Tags</span>
          </div>
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