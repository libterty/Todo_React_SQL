import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { Link } from 'react-router-dom';
import history from '../history';

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      todo: '',
      edit: '',
      showComponent: false
    };
  }

  componentDidMount() {
    fetch(`${document.location.origin}/api${document.location.pathname}`, {
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
          ? this.setState({ todo: '' })
          : this.setState({ todo: json.todo })
      );
  }

  onButtonClick() {
    this.setState({
      showComponent: true
    });
  }

  submitNewTodo = () => {
    fetch(`${document.location.origin}api${document.location.pathname}`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ edit })
    })
      .then(response =>
        response.redirect ? history.push('/') : response.json()
      )
      .then(json => {
        history.push('/');
      })
      .catch(err => console.log(err));
  };

  updateForm = e => {
    this.setState({ edit: e.target.value });
  };

  render() {
    console.log('this.state.edit', this.state.edit);
    return (
      <div className="EditTodo">
        <h4> Edit: {this.state.todo.name} </h4>
        <ListGroup key={this.state.todo.id}>
          <ListGroupItem color="info">
            <p className="todo-name"> {this.state.todo.name} </p>
            <ButtonGroup size="sm">
              <Button onClick={this.onButtonClick}> EDIT </Button>{' '}
              {this.state.showComponent ? (
                <Form
                  action={`/api${document.location.pathname}?_method=PUT`}
                  method="POST"
                >
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      Edit Todo
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="edit"
                      className="form-control"
                      placeholder="update new Todo"
                      value={this.state.edit}
                      onChange={this.updateForm}
                    />
                    <Button
                      type="submit"
                      className="inline"
                      color="danger"
                      size="medium"
                      onClick={this.submitNewTodo}
                    >
                      Submit
                    </Button>
                  </InputGroup>
                </Form>
              ) : null}{' '}
            </ButtonGroup>
          </ListGroupItem>
        </ListGroup>
        <Link to="/"> Home Page </Link>
      </div>
    );
  }
}

export default EditTodo;
