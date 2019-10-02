import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand> Todo List </Navbar.Brand>
          <Button bsStyle="danger"> Logout </Button>
        </Navbar>
      </header>
    );
  }
}

export default Header;
