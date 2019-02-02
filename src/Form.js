import React, { Component } from "react"
import download from './download'

class Form extends Component {
    constructor() {
        super()
        this.state = {
            videoURL: "",
            filename: "",
            status: "",
            downloadedPercent: ""
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
            await download({
                url: this.state.videoURL,
                onStart: (videoName) => this.setState({ filename: videoName, status: "downloading" }),
                onProgress: (chunkLength, downloaded, total) => {
                    const mbDownloaded = (downloaded / 1024 / 1024).toFixed(2)
                    const percent = (downloaded / total * 100).toFixed(2)
                    console.debug("mbDownloaded: ", mbDownloaded)
                    this.setState({ downloadedPercent: percent + "%" })
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
                <h2>{this.state.filename ? `Downloading ${this.state.filename} ${this.state.downloadedPercent}` : 'Download Video'}</h2>
                <p>{this.state.status}</p>
                <input type="text" value={this.state.videoURL} onChange={this.handleInput} placeholder="playlist url" />
                <button onClick={this.submit}>Add</button>
            </form>
        )
    }
}

export default Form
