import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import history from '../history';

class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      msg: ''
    };
  }

  updateUsername = e => {
    this.setState({ name: e.target.value });
  };

  updateEmail = e => {
    this.setState({ email: e.target.value });
  };

  updatePassword = e => {
    this.setState({ password: e.target.value });
  };

  LoginUser() {
    const { email, name, password } = this.state;
    fetch(`${document.location.origin}/users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, password })
    }).then(response => {
      if (response.url === `${document.location.origin}/users/login`) {
        history.push('/users/login');
      } else {
        history.push('/');
      }
    });
  }

  LoginWithFB = () => {
    fetch(`/auth/facebook`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    }).then(response => console.log(response));
  };

  render() {
    return (
      <div className="container mb-3">
        <div className="row mt-t">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3"> Log In </h1>
              <Form action="/users/login" method="POST">
                <FormGroup>
                  <Label htmlFor="name"> Name </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Username"
                    value={this.state.name}
                    onChange={this.updateUsername}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email"> Email </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.updateEmail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password"> Password </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.updatePassword}
                  />
                </FormGroup>
                <Button
                  color="success"
                  size="lg"
                  onClick={() => this.LoginUser()}
                >
                  Submit
                </Button>
              </Form>
              <p className="lead mt-4">
                No Account ?
                <Link to="/users/register"> Register Your Own Account </Link>
              </p>
              <Form action="/auth/facebook" method="GET">
                <Button type="submit" onClick={this.LoginWithFB}>
                  Login with FB
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginUser;
