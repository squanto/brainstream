import React, { Component } from "react"
// import * as fs from 'fs'
// import * as ytdl from 'ytdl-core'
// import { remote } from "electron"
const remote = window.require("electron").remote
// const fs = remote.require("fs")
const ytdl = remote.require("ytdl-core")
const ffmpeg = remote.require("fluent-ffmpeg")


class Form extends Component {
    constructor() {
        super()
        this.state = {
            videoURL: "",
            filename: "",
            status: "",
            downloadedAmount: ""
        }
        this.handleInput = this.handleInput.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleInput(event) {
        this.setState({ videoURL: event.target.value })
    }

    async submit(event) {
        event.preventDefault()
        // send the stuff to download
        console.log("form submitted: ", this.state)
        try {
            // get some info set
            const info = await ytdl.getInfo(this.state.videoURL)
            const filename = info.title.replace('|', '').toString('ascii')
            this.setState({ filename: filename, status: "downloading" })

            // download and convert
            const videoReadStream = ytdl(this.state.videoURL, { quality: 'highestaudio' })
            ffmpeg(videoReadStream)
                .audioBitrate(128)
                .on('progress', (p) => {
                    console.log("progress: ", p) // currentFps, currentKbps, frames, targetSize, timemark
                    this.setState({ downloadedAmount: p.targetSize + "kb" })
                })
                .on('end', () => {
                    this.setState({ status: "done" })
                })
                .save(`${filename}.mp3`)
        } catch (error) {
            console.error("oh noes", error)
        }
    }

    render() {
        return (
            <form>
                <h2>{this.state.filename ? `Downloading ${this.state.filename} ${this.state.downloadedAmount}` : 'Download Video'}</h2>
                <p>{this.state.status}</p>
                <input type="text" value={this.state.videoURL} onChange={this.handleInput} placeholder="playlist url" />
                <button onClick={this.submit}>Add</button>
            </form>
        )
    }
}

export default Form
