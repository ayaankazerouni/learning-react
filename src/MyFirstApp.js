import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import FetchDemo from './FetchDemo';

class MyFirstApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }

  removePerson = index => {
    const { people } = this.state;
    
    this.setState({
      people: people.filter((person, i) => {
        return i !== index;
      }),
    })
  }

  handleSubmit = person => {
    this.setState({ people: [...this.state.people, person] })
  }

  render() {
    const {people} = this.state;

    return (
    <div className="container">
      <Table peopleData={people} removePerson={this.removePerson} />
      <Form handleSubmit={this.handleSubmit}/>
      <FetchDemo subreddit="calpoly" />
    </div>
    )
  }
}

export default MyFirstApp;
