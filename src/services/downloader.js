const extract = require('./extract')
const downloadVideo = require('./downloadVideo')

/*
    2 step downloader
    1. Extract list of vidoes from a playlist
*/
class Downloader {
    constructor(playlistURL) {
        this.extracted = false
        this.videoInfos = [] // id, name tuples
        this.videoInfoToDownload = [] // videoTitle, url/id, onProgress, onDone
    }

    // loads list of { videoID, videoName }'s
    async extract(playlistURL) {
        this.videoInfos = await extract(playlistURL)
        this.extracted = true
    }

    // register callbacks per list item
    register(options = {}) {
        this.videoInfoToDownload.push(options)
    }

    // For each video, provide: videoTitle, url, onProgress, onDone
    async downloadVideos() {
        if (!this.extracted) {
            console.error("extract video info before downloading")
        }
        return await Promise.all(
            this.videoInfoToDownload.map(downloadVideo)
        )
    }
}



module.exports = Downloader
