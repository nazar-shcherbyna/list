const fs = require('fs')

module.exports = {
    read(fileName) {
        const itemsString = fs.readFileSync(fileName, 'utf-8')
        const [keys, ...records] = itemsString.split('\n').map((item) => item.split(','))
        const items = records.map(item => {
            return Object.fromEntries(item.map((value,idx) => [keys[idx], value]))
        })
        return items
    },
    append(fileName, item) {
        fs.appendFileSync(fileName, '\n' + Object.values(item))
    },
    write(fileName, items) {
        fs.writeFileSync(fileName, [Object.keys(items[0]), ...items.map(item => Object.values(item))].join('\n'))
    }
}