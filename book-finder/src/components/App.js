import React, { Component } from 'react';

//Components


//Stylesheets
import '../stylesheets/App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      results: '',
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
    const { results, query } = this.state;

    return (
      <main id="app-container">
        <section id="search">
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </section>
        <section id="results">
          {/* Ternary to display message or results dependant on if this.state.results empty */
            (!results) ?
           <div className="no-result">Please provide a search term</div> :
           (results.map( (result, index) => (
             <div className="result">
               {result.item.volumeInfo.title}
             </div>
           )))
         /* End of Ternary */}
        </section>
      </main>
    );
  }
}

export default App;
