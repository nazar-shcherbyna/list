const { readFile } = require('fs/promises')
const http = require('http')
const fs = require('fs')
const getBody = require('./utils/getBody')
const randomId = require('./utils/randomId')
const workWithJSON = require('./workWithFiles/workWithJSON')

const server = http.createServer(async (request, response) => {
    let { url } = request
    if (url.startsWith('/api/')){
        const route = url.slice(5)
        if (route === 'add'){
            const item = JSON.parse(await getBody(request))
            item.id = randomId()
            const items = workWithJSON.read('items.json')
            items.push(item)
            workWithJSON.write('items.json', items)
            response.end(JSON.stringify(items))
        }
        if (route === 'get'){
            const items = workWithJSON.read('items.json')
            response.end(JSON.stringify(items))
        }
        if (route === 'delete'){
            const {id} = JSON.parse(await getBody(request))
            const items = workWithJSON.read('items.json')
            items.splice(items.findIndex(item => item.id === id), 1)
            workWithJSON.write('items.json', items)
            response.end(JSON.stringify(items))
        }
    } else {
        if (url === '/') {
            url = '/index.html'
        }
        const file = await readFile(`.${url}`)
        if (url.endsWith('.js')) {
            response.setHeader('Content-Type','application/javascript')
        }
        response.end(file)
    }
})

server.listen(4500)