// let nextId = +localStorage.nextId || 1;

import { store } from "./frontScripts/toggleStorage.js";
import ItemsRequest from "./requests/Items.js";

// const items = JSON.parse(localStorage.getItem('items')) || [];
const randomId = () => Math.random().toString(36).slice(3);

form.onsubmit = async () => {
  const item = Object.fromEntries(new FormData(form))
  item.id = randomId()
  let items = []
  if (store.typeOfMemory === 'ls') {
    items = JSON.parse(localStorage.getItem('items')) || []
    items.push(item)
    localStorage.setItem('items', JSON.stringify(items))
  } else {
    items = await ItemsRequest.addItem(item, store.typeOfMemory)
  }
  renderItems(items);
}

itemList.onclick = ({target}) => {
  const {id} = target.dataset

  if (id) {
    if (store.typeOfMemory === 'ls') {
      const items = JSON.parse(localStorage.getItem('items')) || []
      const idx = items.findIndex(item => item.id === id)
      if (idx !== -1) {
        items.splice(idx, 1)
        localStorage.setItem('items', JSON.stringify(items))
        renderItems(items)
      }
    } else {
      ItemsRequest.removeItem(target.dataset.id).then(renderItems)
    }
  }
}

ItemsRequest.getItems().then(renderItems)

function buildItem({id, text, flag, num, date}) {
  return `<li>
  <div class="cell">${id}</div>
  <div class="cell">${text}</div>
  <div class="cell"><input type="checkbox" ${flag && 'checked'}></div>
  <div class="cell">${num}</div>
  <div class="cell">${date}</div>
  <div class="cell"><button data-id=${id}>🗑</button></div>
  </li>`
}

export function renderItems(items) {
  itemList.innerHTML = items.map(buildItem).join('');
}
