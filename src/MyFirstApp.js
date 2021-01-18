import React, { Component } from 'react';
import axios from 'axios';

import Table from './Table';
import Form from './Form';
import FetchDemo from './FetchDemo';

class MyFirstApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  removePerson = id => {
    const { characters } = this.state;

    axios.delete(`http://localhost:5000/users/${id}`)
      .then(res => {
        // 204 status code means the action was successfully enacted
        if (res.status === 204) {
          this.setState({
            characters: characters.filter((character, _) => {
              return character.id != id
            }),
          })
        }
      });
  }

  handleSubmit = character => {
    this.makePostCall(character).then(result => {
      if (result) {
        this.setState({ characters: [...this.state.characters, result] })
      }
    })
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(res => {
        const characters = res.data.users_list;
        this.setState({ characters });
      }).catch(err => {
        console.log(err);
      })
  }

  makePostCall(character) {
    return axios.post('http://localhost:5000/users', character)
      .then(res => {
        if (res.status === 201) {
          return res.data;
        }
        return false;
      }).catch(err => {
        console.log(err);
        return false;
      })
  }

  render() {
    const {characters} = this.state;

    return (
    <div className="container">
      <Table peopleData={characters} removePerson={this.removePerson} />
      <Form handleSubmit={this.handleSubmit}/>
      {/* <FetchDemo subreddit="calpoly" /> */}
    </div>
    )
  }
}

export default MyFirstApp;
