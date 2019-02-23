import React, { Component } from 'react';

//Components


//Stylesheets
import '../stylesheets/App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: ''
    }
  }

  //updateQuery listens for the change in input and sets state, then triggers result chain
  updateQuery = (query) => {
    this.setState({ query : query });
  }

  updateResults = (newResults) => {
    this.setState({ results : newResults })
  }

  render() {
    //Destructuring
    const { query } = this.state;

    return (
      <div id="app-container">
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
      </div>
    );
  }
}

export default App;
