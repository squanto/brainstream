import React, { Component } from "react"
import DownloadForm from "./DownloadForm"
import LocalFiles from "./LocalFiles"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-header">Brainstream</h1>
        <DownloadForm />
        <LocalFiles />
      </div>
    )
  }
}

export default App
