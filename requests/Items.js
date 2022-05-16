import { store } from "../frontScripts/toggleStorage.js"

class ItemsRequest {

    static async getItems(type) {
      document.querySelector('.toggler').value = type
      if (type === 'ls') {
        return JSON.parse(localStorage.getItem('items')) || []
      }
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
            body: JSON.stringify({id, type: store.typeOfMemory}),
          })
          const items = response.json()
          return items
        } catch(e) {
          return []
        }
    }

    static async addItem(item, type) {
      const response = await fetch('api/add', {
          method: 'post',
          body: JSON.stringify({item, type}),
      })
      const items = await response.json()
      return items
    }
}

export default ItemsRequest