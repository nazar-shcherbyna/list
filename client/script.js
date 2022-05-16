import ItemsRequest from "./http/ItemsRequest.js";
import { render } from "./scripts/render.js";
import WebStorage from "./scripts/WebStorage.js";
import { store } from "./store.js";

form.onsubmit = async () => {
    const item = Object.fromEntries(new FormData(form))
    item.id = randomId()
    if (store.memoryType === 'ls') {
        store.items = WebStorage.get('items') || []
        store.items.push(item)
        WebStorage.save('items', store.items)
    } else {
        store.items = await ItemsRequest.addItem(item, store.memoryType)
    }
    render(store.items);
}

itemList.onclick = ({target}) => {
    const {id} = target.dataset

    if (id) {
        if (store.memoryType === 'ls') {
            store.items = WebStorage.get('items') || []
            const idx = items.findIndex(item => item.id === id)
            if (idx !== -1) {
                store.items.splice(idx, 1)
                WebStorage.save('items', store.items)
                render(store.items)
            }
        } else {
            ItemsRequest.removeItem(target.dataset.id).then(render)
        }
    }
}

ItemsRequest.getItems(store.type).then(render)