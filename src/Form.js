import React, { Component } from "react"

class Form extends Component {
    constructor() {
        super()
        this.state = {
            playlistURL: ""
        }
        this.handleInput = this.handleInput.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleInput(event) {
        this.setState({ playlistURL: event.target.value })
    }

    submit(event) {
        event.preventDefault()
        // send the stuff to download
        console.log("form submitted: ", this.state)
    }

    render() {
        return (
            <form>
                <input type="text" value={this.state.playlistURL} onChange={this.handleInput} placeholder="playlist url" />
                <button onClick={this.submit}>Add</button>
            </form>
        )
    }
}

export default Form
