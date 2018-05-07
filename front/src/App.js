import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
class App extends Component {

  state = { socket: null, globalNumber: 0 }

  componentDidMount() {
    const socket = io('http://localhost:8888');


    this.setState({ socket: socket })
    socket.on('number:change', (globalNumber) => {
      this.setState({ globalNumber })
    })
    socket.on('user:new', () => {
      console.log('a user has connected')
    })
    socket.on('user:new', (username) => {
      console.log('a user called ' + username + ' has connected')
    })

    socket.on('user:me', (username) => {
      this.setState({ username })
    })
  }

  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    // do something here to show the globalNumber and use increment and decrement
    return (
      <div>
        <div className="App">
          <h1>{this.state.globalNumber}</h1>
          <p className="App-intro">
            <button onClick={this.onIncrement}>+</button>
            <button onClick={this.onDecrement}>-</button>
          </p>
        </div>
      </div>
    )
  }
}
export default App;