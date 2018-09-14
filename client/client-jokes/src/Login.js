import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleOnChange = e => this.setState({ [e.target.name]: e.target.value})

  Login = e => {
    e.preventDefault();

    axios.post('http://localhost:3300/api/login', this.state)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })

    this.setState({username: '', password: ''})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.Login}>
          <div>
            <label>Username</label>
            <input 
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input 
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleOnChange}
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
