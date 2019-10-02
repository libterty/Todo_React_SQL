import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import history from '../history';

class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
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

  updatePassword2 = e => {
    this.setState({ password2: e.target.value });
  };

  RegisterUser = () => {
    const { email, name, password, password2 } = this.state;
    console.log(this.state);
    fetch(`${document.location.origin}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password, password2 })
    })
      .then(response => response.json())
      .then(json => {
        history.push('/');
      });
  };

  render() {
    return (
      <div className="container mb-3">
        <div className="row mt-t">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3"> Register </h1>
              <Form action="/users/register" method="POST">
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
                <FormGroup>
                  <Label htmlFor="password2"> Confirm your Password </Label>
                  <Input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="Confirm your Password"
                    value={this.state.password2}
                    onChange={this.updatePassword2}
                  />
                </FormGroup>
                <Button color="success" size="lg" onClick={this.RegisterUser}>
                  Submit
                </Button>
              </Form>
              <p className="lead mt-4">
                Already have an Account ?
                <Link to="/users/login"> Log in ! </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
