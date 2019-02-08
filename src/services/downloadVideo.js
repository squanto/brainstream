const ytdl = require("ytdl-core")
const ffmpeg = require("fluent-ffmpeg")
const path = require("path")

const BITRATE = 128

/*
    inputs:
        videoTitle: the title of the video, used to set audio file name
        url: either the url of the yt video or the id of the yt video
        onProgress: a callback for stream downloading progress info
        onDone: a callback for a completed download
*/
async function downloadVideo(options = {}) {
    try {
        // get video info
        const videoTitle = options.videoTitle
        options.onStart(videoTitle)
        // Sanitize filename
        const titleRe = /[:\s'"--)(.]+/g
        const filename = path.join('./tmp/', `${videoTitle.replace(titleRe, "_").toLowerCase()}.mp3`)
        // download and convert video to mp3
        const videoReadStream = ytdl(options.id, { quality: 'highestaudio' })
            .on('progress', options.onProgress)
        return ffmpeg(videoReadStream)
            .audioBitrate(BITRATE)
            .on('end', options.onDone)
            .save(filename)
    } catch (error) {
        console.error(`error downloading video id: ${options.id}`, error)
    }
}

module.exports = downloadVideo
