const remote = window.require("electron").remote
const ytdl = remote.require("ytdl-core")
const ffmpeg = remote.require("fluent-ffmpeg")
const path = remote.require("path")

const BITRATE = 128

export async function downloadVideo(options = {}) {
    try {
        // get video info
        const info = await ytdl.getInfo(options.url)
        const videoTitle = info.title.replace('|', '').toString('ascii')
        options.onStart(videoTitle)
        // Sanitize filename
        const titleRe = /[:\s'"-)(]+/g
        const filename = path.join('./tmp/', `${videoTitle.replace(titleRe, "_").toLowerCase()}.mp3`)
        // download and convert video to mp3
        const videoReadStream = ytdl(options.url, { quality: 'highestaudio' })
            .on('progress', options.onProgress)
        return ffmpeg(videoReadStream)
            .audioBitrate(BITRATE)
            .on('end', options.onDone)
            .save(filename)
    } catch (error) {
        console.error(`error downloading video url: ${options.url}`, error)
    }
}

export default downloadVideo
