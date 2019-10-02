import React, { Component } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-dom';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3> Welcome to 11 Todo List~ </h3>
        <Button bsStyle="danger" bsSize="small">
          Create New Todo
        </Button>
      </div>
    );
  }
}

export default App;
