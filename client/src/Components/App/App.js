//dependencies
import React, { Component } from 'react';
import Header from '../Header'
import Main from '../Main'
import logo from '../../logo.png';

//styling
import './App.css';

class App extends Component {
  render() {
    return ( 
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NotePal</h1>
          <div className="App-nav"><Header /></div>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
