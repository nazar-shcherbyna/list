const { readFile } = require('fs/promises')
const apiRouter = require('./routes/apiRouter')

module.exports = async (request, response) => {
    let { url } = request
    if (url.startsWith('/api/')){
        const route = url.slice(5)
        apiRouter[route](request, response)
    } else {
        if (url === '/') {
            url = '/index.html'
        }
        try {
            const file = await readFile(`.${url}`)
            if (url.endsWith('.js')) {
                response.setHeader('Content-Type','application/javascript')
            }
            response.end(file)
        } catch (e) {
            response.statusCode = 404
            response.end('file not found')
        }
    }
}