import React, { Component } from 'react';

//Stylesheets
import '../stylesheets/App.css';

class App extends Component {

  /**
   * @property { object } results - Object containing the search results
   * @property { string } query - String containing the search criteria
   */
  constructor(props){
    super(props);
    this.state = {
      results: null,
      query: ''
    }
  };

  /**
   * @event listener - Adds scroll event listener on component mount
   */
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * @event listener - Removes scroll event listener on component unmount
   */
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * @function Shows / hides top-icon on scroll
   */
  handleScroll = () => {
    let scrollAmount = (document.body.scrollTop + document.documentElement.scrollTop);
    const topIcon = document.getElementsByClassName("top-icon")[0];

    if (scrollAmount > 10) {
      topIcon.classList.remove("hide");
    } else {
      topIcon.classList.add("hide");
    }
  }

  /**
   * @function updateQuery listens for the change in input and sets state
   * @param {string} query - Search criteria
   * @returns update to query in state
   */
  updateQuery = (query) => {
    this.setState({ query : query });
  };

  /**
   * @function updateResults Adds response from search to results in state
   * @param  { object } response - Response object containing data
   * @return update to result in state
   */
  updateResults = (response) => {
    this.setState({ results : response })
  };

  /**
   * @async fetch API call
   * @param  { string } searchInput String to pass into API call
   * @return { object } returns an HTTP response, then data is extracted into JSON
   */
  getResults = (searchInput) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=10`)
    .then( response => {
      response.json()
      .then((responseData) => {
        let results = responseData.items
        this.updateResults(results);
      })
    })
    .catch( error => console.log(error));
  };

  /**
   * @function handleKeyPress - Fires getResults function if user presses enter key
   * @param { event } e - event
   * @fires getResults
   */
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.getResults(this.state.query);
    };
  };

  /**
   * @function handleClick - Fires getResults function if user clicks on button
   * @param { event } e - event
   * @fires getResults
   */
  handleClick = (e) => {
    this.getResults(this.state.query);
  };

  /**
   * @function toTop - Handles scrolling window to the top
   * @param { event } e - event
   */
  toTop = (e) => {
    window.scrollTo(0,0);
  }


  render() {
    //Destructuring
    const { results, query } = this.state;

    return (
      <main id="app-container">
        <section id="search">
          <h1 className="header">The 10 Book Search</h1>
          <span className="search-bar">
            <i className="fas fa-search search-icon pointer"
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
          <i className="fas fa-angle-double-up top-icon pointer hide"
             onClick={this.toTop}></i>
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
