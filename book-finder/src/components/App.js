import React, { Component } from 'react';

//Components
import Search from './Search.js';

//Stylesheets
import '../stylesheets/App.css';
import '../stylesheets/Search.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {

    }

  }

  render() {
    return (
      <div id="app-container">
        <Search />
      </div>
    );
  }
}

export default App;
