const getBody = require("../utils/getBody")
const randomId = require("../utils/randomId")
const workWithCSV = require("../workWithFiles/workWithCSV")
const workWithJSON = require("../workWithFiles/workWithJSON")

module.exports = {
    async add(request, response) {
        const item = {id: randomId(), ...JSON.parse(await getBody(request))}
        // const items = workWithJSON.read('items.json')
        // const items = workWithCSV.read('items.json')
        const items = workWithCSV.read('items.csv')
        items.push(item)
        workWithCSV.write('items.csv', items)
        response.end(JSON.stringify(items))
    },
    get(request, response) {
        // const items = workWithJSON.read('items.json')
        const items = workWithCSV.read('items.csv')
        response.end(JSON.stringify(items))
    },
    async delete(request, response) {
        const {id} = JSON.parse(await getBody(request))
        const items = workWithCSV.read('items.csv')
        // const items = workWithCSV.read('items.json')
        items.splice(items.findIndex(item => item.id === id), 1)
        // workWithCSV.write('items.json', items)
        workWithCSV.write('items.csv', items)
        response.end(JSON.stringify(items))
    },
}