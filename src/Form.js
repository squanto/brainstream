import React, { Component } from "react"
import downloadVideo from './downloader'

class Form extends Component {
    constructor() {
        super()
        this.state = {
            videoURL: "",
            videoTitle: "",
            status: "",
            downloadedPercent: "",
            downloadedMB: ""
        }
        this.handleInput = this.handleInput.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleInput(event) {
        this.setState({ videoURL: event.target.value })
    }

    async submit(event) {
        event.preventDefault()
        try {
            await downloadVideo({
                url: this.state.videoURL,
                onStart: (videoTitle) => this.setState({ videoTitle, status: "downloading" }),
                onProgress: (chunkLength, downloaded, total) => {
                    const downloadedMB = (downloaded / 1024 / 1024).toFixed(2)
                    const percent = (downloaded / total * 100).toFixed(2)
                    this.setState({
                        downloadedPercent: percent,
                        downloadedMB: downloadedMB
                    })
                },
                onDone: () => this.setState({ status: "done" })
            })
        } catch (error) {
            console.error("oh noes", error)
        }
    }

    render() {
        return (
            <form>
                <h2>Download Video</h2>
                {!!this.state.status && <div>
                    <h4>`Downloading ${this.state.videoTitle} {this.state.downloadedPercent}%`</h4>
                    <p>downloaded {this.state.downloadedMB} mb</p>
                    <p>{this.state.status}</p>
                </div>}
                <input type="text" value={this.state.videoURL} onChange={this.handleInput} placeholder="playlist url" />
                <button onClick={this.submit}>Add</button>
            </form>
        )
    }
}

export default Form
