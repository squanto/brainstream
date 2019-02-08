import React, { Component } from 'react'
import DownloadForm from "./DownloadForm"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Brainstream</h1>
          <DownloadForm />
        </header>
      </div>
    )
  }
}

export default App
