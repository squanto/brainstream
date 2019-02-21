const fs = require("fs")
const path = require("path")

class Player {
  constructor() {
    this.filesFolder = path.join(__dirname, "../..", "tmp")
  }

  ls() {
    return fs.readdirSync(this.filesFolder)
  }
}

module.exports = Player
