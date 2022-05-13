// let nextId = +localStorage.nextId || 1;

import ItemsRequest from "./requests/Items.js";

// const items = JSON.parse(localStorage.getItem('items')) || [];

form.onsubmit = async () => {
  const item = Object.fromEntries(new FormData(form))
  const items = await ItemsRequest.addItem(item)
  renderItems(items);
}

itemList.onclick = ({target}) => {
  if (target.dataset.id) {
    ItemsRequest.removeItem(target.dataset.id).then(renderItems)
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

function renderItems(items) {
  itemList.innerHTML = items.map(buildItem).join('');
}
