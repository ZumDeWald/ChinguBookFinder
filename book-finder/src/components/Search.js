import React, { Component } from 'react';

class Search extends Component {

  state = {
    searchResults: [],
    query: ''
  }

  //updateQuery listens for the change in input and sets state, then triggers result chain
  updateQuery = (query) => {
    this.setState({ query : query });
  }



  render () {
    //Destructuring
    const { query } = this.state;

    return (
      <div id="search">
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(e) => this.updateQuery(e.target.value)}
          />
        </div>
      </div>
    )
  }


}

export default Search
