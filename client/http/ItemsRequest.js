import { store } from "../store.js"
import { makeRequest } from "./makeRequest.js"

class ItemsRequest {

    static async getItems() {
        const type = store.memoryType
        try {
            document.querySelector('.toggler').value = type
            if (type === 'ls') {
                return JSON.parse(localStorage.getItem('items')) || []
            }
            const items = await makeRequest('api/get', {
                body: JSON.stringify({type}),
                method: 'post',
            })
            return items
        } catch (e) {
            return []
        }
    }

    static async removeItem(id) {
        try {
            const items = await makeRequest('api/delete', {
                method: 'post',
                body: JSON.stringify({id, type: store.memoryType}),
            })
            return items
        } catch(e) {
            return []
        }
    }

    static async addItem(item, type) {
        try {
            const items = await makeRequest('api/add', {
                method: 'post',
                body: JSON.stringify({item, type}),
            })
            return items
        } catch (e) {
            return []
        }
    }
}

export default ItemsRequest