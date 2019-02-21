import React, { Component } from "react"
import DownloadProgress from "./DownloadProgress"

class DownloadForm extends Component {
  constructor() {
    super()
    this.state = {
      playlistURL: "",
      videoInfos: []
    }
    this.handleInput = this.handleInput.bind(this)
    this.submit = this.submit.bind(this)
    this.downloader = new window.desktop.Downloader()
  }

  handleInput(event) {
    this.setState({ playlistURL: event.target.value })
  }

  async submit(event) {
    event.preventDefault()

    await this.downloader.extract(this.state.playlistURL)
    this.setState({ videoInfos: this.downloader.videoInfos })
    await this.downloader.downloadVideos()
  }

  render() {
    const progresses = this.state.videoInfos.map(videoInfo => {
      return (
        <DownloadProgress
          key={videoInfo.id}
          id={videoInfo.id}
          videoTitle={videoInfo.videoTitle}
          downloader={this.downloader}
        />
      )
    })
    return (
      <form>
        <input
          type="text"
          value={this.state.playlistURL}
          onChange={this.handleInput}
          placeholder="playlist url"
        />
        <button onClick={this.submit}>Add</button>
        <ul>{progresses}</ul>
      </form>
    )
  }
}

export default DownloadForm
