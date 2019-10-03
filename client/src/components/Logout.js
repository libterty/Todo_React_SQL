import React, { Component } from 'react';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false
    };
  }

  checkLog = () => {
    fetch(`${document.location.origin}/users/logout`, {
      method: 'GET'
    }).then(response => console.log(response));
  };
}

export default Logout;
