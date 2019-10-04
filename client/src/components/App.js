import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Collapse,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  ListGroup,
  ListGroupItem
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
    this.ediToggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      status: 'Closed',
      name: '',
      todos: []
    };
  }

  componentDidMount() {
    fetch(`${document.location.origin}/api/todo`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response =>
        response.redirected ? history.push('/users/login') : response.json()
      )
      .then(json =>
        json === undefined
          ? this.setState({ todos: '' })
          : this.setState({ todos: json.todos })
      );
  }

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

  updateForm = e => {
    this.setState({ name: e.target.value });
  };

  submitNewTodo = () => {
    fetch(`${document.location.origin}api/newtodo`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(json => {
        history.push('/');
      })
      .catch(err => console.log(err));
  };

  deleteTodo = () => {
    fetch(`${document.location.origin}/api/:id/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => (response.redirect ? history.push('/') : 'Warning'))
      .catch(err => console.log(err));
  };

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
          <Form action="/api/newtodo" method="POST">
            <InputGroup>
              <InputGroupAddon addonType="prepend"> New Todo </InputGroupAddon>
              <Input
                type="text"
                name="name"
                placeholder="create ur todo"
                className="form-control"
                value={this.state.name}
                onChange={this.updateForm}
              />
              <InputGroupAddon addonType="append">
                <Button
                  type="submit"
                  color="success"
                  size="medium"
                  onClick={this.submitNewTodo}
                >
                  Submit
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </Collapse>
        <br /> <h3> Your Todo </h3>{' '}
        {this.state.todos.map(todo => {
          return (
            <ListGroup key={todo.id}>
              <ListGroupItem color="info">
                <p className="todo-name"> {todo.name} </p>
                <ButtonGroup size="sm">
                  <Button
                    type="button"
                    className="inline"
                    color="danger"
                    value={todo.id}
                    href={`/${todo.id}`}
                  >
                    EDIT
                  </Button>
                  <Form
                    action={`/api/${todo.id}/?_method=DELETE`}
                    method="POST"
                    className="inline"
                  >
                    <Button
                      className="inline"
                      color="danger"
                      type="submit"
                      onClick={this.deleteTodo}
                    >
                      DELETE
                    </Button>
                  </Form>
                </ButtonGroup>
              </ListGroupItem>
            </ListGroup>
          );
        })}{' '}
      </div>
    );
  }
}

export default App;
