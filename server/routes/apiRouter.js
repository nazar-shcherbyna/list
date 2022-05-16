const memotyType = require("../constanst/memoryType")
const getBody = require("../utils/getBody")
const randomId = require("../utils/randomId")
const workWithCSV = require("../workWithFiles/workWithCSV")
const workWithJSON = require("../workWithFiles/workWithJSON")

module.exports = {
    async add(request, response) {
        let items = []

        const {item, type} = JSON.parse(await getBody(request))
        const itemNew = {id: randomId(), ...item}
        if (type === memotyType.json) {
            items = workWithJSON.read('items.json') 
            items.push(itemNew)
            workWithJSON.write('items.json', items)
        } else if (type === memotyType.csv) {
            items = workWithCSV.read('items.csv')
            items.push(itemNew)
            workWithCSV.write('items.csv', items)
        }
        response.end(JSON.stringify(items))
    },
    async get(request, response) {
        const body = await getBody(request)
        const {type} = JSON.parse(body)
        console.log(type);
        let items = []
        if (type === memotyType.json) {
            items = workWithJSON.read('items.json')
        } else if (type === memotyType.csv) {
            items = workWithCSV.read('items.csv')
        }
        response.end(JSON.stringify(items))
    },
    async delete(request, response) {
        const {id, type} = JSON.parse(await getBody(request))
        let items = []

        if (type === 'csv') {
            items = workWithCSV.read('items.csv')
        } else if (type === 'json') {
            items = workWithJSON.read('items.json')
        }

        items.splice(items.findIndex(item => item.id === id), 1)
        
        if (type === 'csv') {
            workWithCSV.write('items.csv', items)
        } else if (type === 'json') {
            workWithJSON.write('items.json', items)
        }
        response.end(JSON.stringify(items))
    },
}