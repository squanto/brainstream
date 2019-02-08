const request = require('superagent')
const cheerio = require('cheerio')

// Given a youtube playlist url
// Extract array of { videoID, videoName }
async function extract(playlistURL) {
    const response = await request.get(playlistURL)
    const $ = cheerio.load(response.text)

    const infos = []
    $('tr').each((i, element) => {
        infos.push({
            id: element.attribs['data-video-id'],
            videoTitle: element.attribs['data-title']
        })
    })
    return infos
}


module.exports = extract
