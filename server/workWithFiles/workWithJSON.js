const fs = require('fs')

module.exports = {
    write(fileName, data) {
        fs.writeFileSync(fileName, JSON.stringify(data, null, 4))
    },
    read(fileName) {
        try {
            const jsonFile = fs.readFileSync(fileName, 'utf-8')
            return JSON.parse(jsonFile || `[]`)
        } catch (e) {
            return []
        }
    }
}