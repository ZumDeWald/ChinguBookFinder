import React, { Component } from 'react';

//Components
import Search from './Search.js';

//Stylesheets
import '../stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
      </div>
    );
  }
}

export default App;
