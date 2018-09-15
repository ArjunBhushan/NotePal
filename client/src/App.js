//dependencies
import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import logo from './logo.png';

//styling
import './App.css';

class App extends Component {
  render() {
    return ( 
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NotePal</h1>
        </header>
        <p className="App-intro">
          Upload an image of your notes to get started.
        </p>
        <div>
          <ImageUpload /> 
        </div>
      </div>
    );
  }
}

export default App;
