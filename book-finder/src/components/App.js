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

  //Handle click from search-bar icon
  handleClick = (e) => {
    this.getResults(this.state.query);
  };

  render() {
    //Destructuring
    const { results, query } = this.state;

    return (
      <main id="app-container">
        <section id="search">
          <h1 className="header">The 10 Book Search</h1>
          <span className="search-bar">
            <i className="fas fa-search search-icon"
               onClick={this.handleClick}></i>
            <input
              className="search-input"
              type="text"
              placeholder="Type keyword and press enter"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
              onKeyPress={this.handleKeyPress}
            />
          </span>
        </section>

        <section id="results">
          {/* Ternary to display message or results dependant on if this.state.results empty */
            (!results) ?
          <div className="no-result">Please provide a search term</div> :
          (<ul className="result-list">
            {results.map( (result, index) => (
            <li className="result-item"
                 key={index}>

              {/* Ternary to display cover if available */
              (!!result.volumeInfo.imageLinks) ?
              <img alt={index}
                   className="result-image"
                   src={result.volumeInfo.imageLinks.smallThumbnail} />
                : <img alt={index} src="http://via.placeholder.com/128x193?text=No%20Cover" />
              /* End of cover ternary */}

                <span className="result-item-info">
                  <h4 className="result-title"><strong> {result.volumeInfo.title} </strong></h4>

                  {/* Ternary to display author if available */
                  (!!result.volumeInfo.authors) ?
                  <p className="result-info">
                  <em>{result.volumeInfo.authors[0]}</em></p>
                  : <p className="result-info">
                  <em>Author Unavailable</em></p>
                  /* End of author ternary */}

                  {/* Ternary to display price if availabe */ (!!result.saleInfo.listPrice) ?
                  <p className="result-info">Price: {result.saleInfo.listPrice.amount}</p>
                  : <p className="result-info">Not for sale</p>
                  /* End of price ternary */}

                  <a href={result.volumeInfo.infoLink}
                    target="_blank"
                    rel="noopener noreferrer">More Info</a>
                </span>
              </li>
            ))}
          </ul>)
          /* End of search criteria Ternary */}
        </section>
        <section id="footer">
          <a href="https://github.com/ZumDeWald/ChinguBookFinder"
             target="_blank"
             rel="noopener noreferrer"
             >Source Code</a>
        </section>
      </main>
    );
  }
}

export default App;
