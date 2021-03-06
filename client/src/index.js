import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import EditTodo from './components/EditTodo';
import history from './history';
import './index.css';

render(
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <Header />
        <App />
      </Route>
      <Route exact path="/users/register">
        <Header />
        <Register />
      </Route>
      <Route exact path="/users/login">
        <Header />
        <Login />
      </Route>
      <Route exact path="/:id">
        <Header />
        <EditTodo />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
