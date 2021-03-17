import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import Table from './Table';
import Form from './Form';

// function App() {
//   const [ characters, setCharacters] = useState([]);

//   const removePerson = (id) => {
//     axios.delete(`http://localhost:5000/users/${id}`)
//       .then(res => {
//         // 204 status code means the action was successfully enacted
//         if (res.status === 204) {
//           setCharacters(
//             characters.filter((character, _) => {
//               return character.id !== id;
//             }),
//           );
//         }
//       });
//   }

//   const handleSubmit = (character) => {
//     axios.post('http://localhost:5000/users', character)
//       .then(res => {
//         if (res.status === 201) {
//           setCharacters([...characters, res.data])
//         }
//       }).catch(err => {
//         console.log(err);
//         return false;
//       });
//   }

//   const fetchUsers = () => {
//     axios.get('http://localhost:5000/users')
//       .then(res => {
//         const characters = res.data.users_list;
//         setCharacters(characters);
//       }).catch(err => {
//         console.log(err);
//       })
//   }

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="container">
//       <Table peopleData={characters} removePerson={removePerson} />
//       <Form handleSubmit={handleSubmit}/>
//       {/* <FetchDemo subreddit="calpoly" /> */}
//     </div>
//   );
// };

// Without hooks. Not currently used. 
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
              return character.id !== id
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
    </div>
    )
  }
}

export default MyFirstApp;
