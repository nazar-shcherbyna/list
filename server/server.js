const http = require('http')
const fs = require('fs')
const requestHandler = require('./requestHandler')

const server = http.createServer(requestHandler)

server.listen(4500)