import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Button } from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLog: false
    };
  }

  get displayLog() {
    if (this.state.isLog) {
      return (
        <Button
          type="button"
          color="danger"
          size="medium"
          onClick={this.checkLog}
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

  // componentDidMount() {
  //   fetch(`${document.location.origin}/api/todo`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(response =>
  //     response.redirected
  //       ? this.setState({ isLog: false })
  //       : this.setState({ isLog: true })
  //   );
  // }

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
