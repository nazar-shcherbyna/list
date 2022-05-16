const getBody = async (stream) => {
    const chunks = []
    for await (const chunk of stream) {
        chunks.push(chunk)
    }
    const body = Buffer.concat(chunks).toString()
    return body
}

module.exports = getBody