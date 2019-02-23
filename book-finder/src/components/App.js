import React, { Component } from 'react';

//Components
import Search from './Search.js';

//Stylesheets
import '../stylesheets/App.css';
import '../stylesheets/Search.css';

class App extends Component {
  render() {
    return (
      <div id="app-container">
        <Search />
      </div>
    );
  }
}

export default App;
