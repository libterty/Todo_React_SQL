import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
  Form
} from 'reactstrap';
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

  render() {
    console.log('this.state.todo', this.state.todo);
    return (
      <div className="EditTodo">
        <h4> Edit: {this.state.todo.name} </h4>
        <ListGroup key={this.state.todo.id}>
          <ListGroupItem color="info">
            <p className="todo-name"> {this.state.todo.name} </p>
            <ButtonGroup size="sm">
              <Button onClick={this.onButtonClick}> EDIT </Button>
            </ButtonGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default EditTodo;
