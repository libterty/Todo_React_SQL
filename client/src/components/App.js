import React, { Component } from 'react';
import {
  Button,
  Collapse,
  Form,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';
import history from '../history';

class App extends Component {
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, status: 'Closed', name: '' };
  }

  // async componentWillMount() {
  //     try {
  //         const res = await fetch(`${document.location.origin}`);
  //         console.log(res);
  //         if (res.redirected) {
  //             // history.push('/users/login');
  //         } else console.log('Success login');
  //     } catch (err) {
  //         console.log(err);
  //     }
  // }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div className="App">
        <h3> Welcome to 11 Todo List~ </h3>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: '1rem' }}
          size="medium"
        >
          Create New Todo
        </Button>
        <h5> Current state: {this.state.status} </h5>
        <Collapse
          isOpen={this.state.collapse}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <Form action="/todos" method="POST">
            <InputGroup>
              <InputGroupAddon addonType="prepend"> New Todo </InputGroupAddon>
              <Input
                type="text"
                name="name"
                placeholder="create ur todo"
                className="form-control"
              />
              <InputGroupAddon addonType="append">
                <Button type="submit" color="success" size="medium">
                  Submit
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </Collapse>
      </div>
    );
  }
}

export default App;
