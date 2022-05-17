class WebStorage {
    static get(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    static save(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }
}

export default WebStorage