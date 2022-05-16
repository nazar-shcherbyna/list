const memotyType = require("../constanst/memotyType")
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
    async get(request, response) {
        const body = await getBody(request)
        const {type} = JSON.parse(body)
        console.log(type);
        let items = []
        if (type === memotyType.json) {
            items = workWithJSON.read('items.json')
        } else if (type === memotyType.csv) {
            items = workWithCSV.read('items.csv')
        } else if (type === memotyType.ls) {
            items = workWithCSV.read('items.csv')
        }
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