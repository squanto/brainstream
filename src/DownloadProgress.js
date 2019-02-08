import React, { Component } from "react"

class DownloadProgress extends Component {
    // params: downloader, url, videoName
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            videoTitle: props.videoTitle,
            id: props.id, // maybe unnecessary
            downloadedPercent: "",
            downloadedMB: ""
        }
        this.downloader = props.downloader

        this.downloader.register({
            id: props.id,
            videoTitle: props.videoTitle,
            onStart: () => this.setState({ status: "downloading" }),
            onProgress: (chunkLength, downloaded, total) => {
                const downloadedMB = (downloaded / 1024 / 1024).toFixed(2)
                const downloadedPercent = (downloaded / total * 100).toFixed(2)
                this.setState({ downloadedPercent, downloadedMB })
            },
            onDone: () => this.setState({ status: "done" })
        })
    }

    render() {
        return (
            <li>
                {!!this.state.status && <div>
                    <h4>Downloading {this.state.videoTitle}</h4>
                    <small>{this.state.downloadedPercent}% done</small>
                    <p>{this.state.downloadedMB} mb downloaded</p>
                    <p>status: {this.state.status}</p>
                </div>}
            </li>
        )
    }
}

export default DownloadProgress
