import React, { Component } from "react"
const electron = window.require("electron")

const fs = electron.remote.require("fs")
const ytdl = electron.remote.require("ytdl-core")


class Form extends Component {
    constructor() {
        super()
        this.state = {
            videoURL: ""
        }
        this.handleInput = this.handleInput.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleInput(event) {
        this.setState({ videoURL: event.target.value })
    }

    submit(event) {
        event.preventDefault()
        // send the stuff to download
        console.log("form submitted: ", this.state)

        ytdl(this.state.videoURL)
            .pipe(fs.createWriteStream('testvid.flv'))
            .on('end', () => console.log("done downloading"))
    }

    render() {
        return (
            <form>
                <input type="text" value={this.state.videoURL} onChange={this.handleInput} placeholder="playlist url" />
                <button onClick={this.submit}>Add</button>
            </form>
        )
    }
}

export default Form
