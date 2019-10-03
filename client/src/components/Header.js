import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

class Header extends Component {
  componentDidMount() {
    this.isLogout();
  }

  isLogout() {
    fetch(`http://localhost:3001/users/logout`, {
      method: 'GET'
    }).then(response => response.text());
  }

  render() {
    return (
      <header>
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand> Todo List </Navbar.Brand>
          <Button bsStyle="danger" onClick={() => this.isLogout()}>
            Logout
          </Button>
        </Navbar>
      </header>
    );
  }
}

export default Header;
