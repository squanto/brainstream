const ytdl = require("ytdl-core")
const ffmpeg = require("fluent-ffmpeg")
const path = require("path")

const BITRATE = 128

// TODO: revert to before test

/*
    inputs:
        videoTitle: the title of the video, used to set audio file name
        id: either the url of the yt video or the id of the yt video
        onStart: a callback indicating option parsing has started
        onProgress: a callback for stream downloading progress info
        onEnd: a callback for a completed download
*/
async function downloadVideo(options = {}) {
  try {
    // get video info
    const videoTitle = options.videoTitle
    options.onStart(videoTitle)
    // Sanitize filename
    const titleRe = /[:\s'"--)(.]+/g
    let filename = videoTitle.replace(titleRe, "_").toLowerCase()
    const filePath = path.join("./tmp/", `${filename}.mp3`)
    // download and convert video to mp3

    // option { quality: "highestaudio" } makes downloading reeeally slow.
    const videoReadStream = ytdl(options.id).on("progress", options.onProgress)
    return ffmpeg(videoReadStream)
      .audioBitrate(BITRATE)
      .on("end", options.onEnd)
      .save(filePath)
  } catch (error) {
    console.error(`error downloading video id: ${options.id}`, error)
  }
}

module.exports = downloadVideo
