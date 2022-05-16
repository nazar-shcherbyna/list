import ItemsRequest from "../requests/Items.js";
import { renderItems } from "../../script.js";

const toggler = document.querySelector('.toggler')
export const store = {
    typeOfMemory: 'json'
}

toggler.onchange = async (e) => {
    store.typeOfMemory = e.target.value
    console.log(store.typeOfMemory);
    let items = []
    if (store.typeOfMemory === 'ls') {
        items = JSON.parse(localStorage.getItem('items')) || []
    } else {
        items = await ItemsRequest.getItems(store.typeOfMemory)
    }
    localStorage.setItem('memoryType', JSON.stringify(store.typeOfMemory))
    renderItems(items)
}