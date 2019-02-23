import React, { Component } from 'react';

//Components


//Stylesheets
import '../stylesheets/App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      results: null,
      query: ''
    }
  };

  //updateQuery listens for the change in input and sets state, then triggers result chain
  updateQuery = (query) => {
    this.setState({ query : query });
  };

  updateResults = (response) => {
    this.setState({ results : response })
  };

  //Fetch API request
  getResults = (searchInput) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=10`)
    .then( response => {
      response.json()
      .then((responseData) => {
        console.log(responseData);
        let results = responseData.items
        this.updateResults(results);
      })
    })
    .catch( error => console.log(error));
  };

  //Handle key press from search bar
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.getResults(this.state.query);
    };
  };

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
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </section>
        <section id="results">
          {/* Ternary to display message or results dependant on if this.state.results empty */
            (!results) ?
           <div className="no-result">Please provide a search term</div> :
           (<ul className="result-list">
               {results.map( (result, index) => (
               <li className="result-item"
                   key={index}>
                   <img
                     alt={index} src={result.volumeInfo.imageLinks.smallThumbnail} />
                   <span className="result-item-info">
                     <h3 className="result-title"><strong>
                     {result.volumeInfo.title}
                   </strong></h3>
                   </span>
               </li>
              ))}
             </ul>)
         /* End of Ternary */}
        </section>
      </main>
    );
  }
}

export default App;
