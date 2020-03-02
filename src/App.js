import React, { Component } from 'react';
import axios from 'axios';
import { Observable, from } from 'rxjs';

import './App.css';

export class App extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    // this.fetchUsers();
    // this.fetchUsersObservables();
    // this.fetchUsersFrom();
  }

  fetchUsers = async () => {
    const promise = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    const data = promise.data;
    this.setState({ users: data });
  };

  // fetch users by converting promise into an observable manually
  // Writing a custom observer to handle the success response, error response and cancel request
  fetchUsersObservables = () => {
    const observable = new Observable(observer => {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          observer.next(res);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });

    observable.subscribe(res => {
      this.setState({
        users: res.data
      });
    });
  };

  // fetch users by already build "from" function in rxjs library
  // Advantage is that you don't have to write any custom observer, handling the success response, error responses and cancel request are all defined correctly for you
  fetchUsersFrom = () => {
    const promise = axios.get('https://jsonplaceholder.typicode.com/users');
    const observable = from(promise);

    observable.subscribe(res => {
      this.setState({
        users: res.data
      });
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        {users.map(u => (
          <ul key={u.id}>
            <li>{u.name}</li>
          </ul>
        ))}
      </div>
    );
  }
}

export default App;
