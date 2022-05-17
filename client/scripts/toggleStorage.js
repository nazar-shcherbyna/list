import ItemsRequest from "../http/ItemsRequest.js";
import WebStorage from "./WebStorage.js";
import { store } from "../store.js";
import { render } from './render.js';

const toggler = document.querySelector('.toggler')

toggler.onchange = async (e) => {
    store.memoryType = e.target.value
    console.log(store.memoryType);
    let items = []
    if (store.memoryType === 'ls') {
        items = WebStorage.get('items') || []
    } else {
        items = await ItemsRequest.getItems()
    }
    WebStorage.save('memoryType', store.memoryType)
    render(items)
}