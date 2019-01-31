import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Form from "./Form"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Brainstream w00t</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <Form />
        </header>
      </div>
    )
  }
}

export default App
