import React from 'react';
import { Component } from 'react';
import Board from './board';
import Header from './header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Board />
      </div>
    );
  }
}

export default App;
