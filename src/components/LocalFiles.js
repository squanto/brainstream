import React, { Component } from "react"

export default class LocalFiles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
    this.player = undefined
  }

  componentDidMount() {
    this.player = this.player || new window.desktop.Player()
    this.setState({
      files: this.player.ls()
    })
  }

  render() {
    const files = this.state.files.map(file => <li>{file}</li>)
    return <ul>{files}</ul>
  }
}
