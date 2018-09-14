import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Login from './Login';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
