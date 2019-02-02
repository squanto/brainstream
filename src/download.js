const remote = window.require("electron").remote
const ytdl = remote.require("ytdl-core")
const ffmpeg = remote.require("fluent-ffmpeg")

const BITRATE = 128

async function download(options = {}) {
    try {
        // get video info
        const info = await ytdl.getInfo(options.url)
        const videoName = info.title.replace('|', '').toString('ascii')
        options.onStart(videoName)
        // Sanitize filename
        const titleRe = /[:\s]+/g
        const filename = `${videoName.replace(titleRe, "_").toLowerCase()}.mp3`
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

export default download
