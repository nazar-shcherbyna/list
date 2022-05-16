import { store } from "../frontScripts/toggleStorage.js"

class ItemsRequest {

    static async getItems(type = 'json') {
        const response = await fetch('api/get', {
          body: JSON.stringify({type}),
          method: 'post',
        })
        const items = await response.json()
        return items
    }

    static async removeItem(id) {
        try {
          const response = await fetch('api/delete', {
            method: 'post',
            body: JSON.stringify({id}),
          })
          const items = response.json()
          return items
        } catch(e) {
          return []
        }
    }

    static async addItem(item) {
      const response = await fetch('api/add', {
          method: 'post',
          body: JSON.stringify(item),
      })
      const items = await response.json()
      return items
    }
}

export default ItemsRequest