import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Button } from 'reactstrap';
import history from '../history';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogout: true
    };
  }

  componentDidUpdate() {
    setTimeout(() => {
      fetch(`${document.location.origin}/api/todo`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response =>
        // console.log(response)
        response.url === `${document.location.origin}/users/login`
          ? this.setState({ isLogout: false })
          : this.setState({ isLogout: true })
      );
    }, 500);
  }

  get displayLog() {
    if (this.state.isLogout) {
      return (
        <Button
          type="button"
          color="danger"
          size="medium"
          onClick={this.logoutUser}
        >
          Logout
        </Button>
      );
    }

    return (
      <Button type="button" color="Login" href="/users/login">
        Login
      </Button>
    );
  }

  logoutUser = () => {
    fetch(`${document.location.origin}/users/logout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => (response.redirected ? alert('You have logout') : null))
      .then(json => (json === undefined ? history.push('/users/login') : null));
  };

  render() {
    return (
      <header>
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand> Todo List </Navbar.Brand> {this.displayLog}{' '}
        </Navbar>
      </header>
    );
  }
}

export default Header;
