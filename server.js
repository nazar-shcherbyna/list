const { readFile } = require('fs/promises')
const http = require('http')
let nextId = 1
const items = []

const server = http.createServer(async (request, response) => {
    let { url } = request
    if (url.startsWith('/api/')){
        const route = url.slice(5)
        if (route === 'add'){
            const item = JSON.parse(await getBody(request))
            item.id = nextId++
            items.push(item)
            response.end(JSON.stringify(items))
        }
        if (route === 'get'){
            response.end(JSON.stringify(items))
        }
        if (route === 'delete'){
            const {id} = JSON.parse(await getBody(request))
            items.splice(items.findIndex(item => item.id === id), 1)
            response.end(JSON.stringify(items))
        }
    } else {
        if (url === '/') {
            url = '/index.html'
        }
        const file = await readFile(`.${url}`)
        response.end(file)
    }
})

server.listen(4500)

const getBody = async (stream) => {
    const chunks = []
    for await (const chunk of stream) {
        chunks.push(chunk)
    }
    const body = Buffer.concat(chunks).toString()
    return body
}