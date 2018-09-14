import React, { Component } from 'react';
import axios from 'axios';


class Jokes extends Component {
  state = {
    jokes: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');

    const reqOptions = {
      headers: {
        Authorization: token,
      },
    };

    axios.get('http://localhost:3300/api/jokes', reqOptions)
    .then(res => {
      console.log(res.data)
      this.setState({jokes: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.jokes.map((joke, index) => <li key={index}>{joke.punchline}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default Jokes;
