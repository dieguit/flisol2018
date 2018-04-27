import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Flisol 2018</h1>
        </header>
        <div className="App-intro">
          <Counter algunaProp="flisol" />
        </div>
      </div>
    );
  }
}

class Counter extends Component {
  state = { counter: 0 };

  componentWillMount() {
    console.info('componentWillMount()');
  }
  componentDidMount() {
    console.info('componentDidMount()');
  }
  shouldComponentUpdate() {
    console.info('shouldComponentUpdate()');
    return true;
  }
  componentDidUpdate() {
    console.info('componentDidUpdate()');
  }
  componentWillReceiveProps() {
    console.info('componentWillReceiveProps()');
  }

  onClick = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    console.info('render()');
    const { counter } = this.state;

    return (
      <div>
        Button was clicked:
        <div>{counter} times</div>
        <button onClick={this.onClick}>Click Me</button>
      </div>
    );
  }
}

export default App;
