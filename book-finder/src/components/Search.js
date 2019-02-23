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

      <div className="search-books">
        <div className="search-books-bar">

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }


}

export default Search