// let nextId = +localStorage.nextId || 1;

// const items = JSON.parse(localStorage.getItem('items')) || [];

form.onsubmit = async () => {
  const item = Object.fromEntries(new FormData(form))
  const response = await fetch('api/add', {
    method: 'post',
    body: JSON.stringify(item),
  })
  const items = await response.json()
  renderItems(items);
}

itemList.onclick = ({target}) => {
  if (target.dataset.id) {
    removeItem(target.dataset.id * 1).then(renderItems)
  }
}

getItems().then(renderItems)

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

function getNextId (){
  nextId++
  localStorage.nextId = nextId;
  return nextId - 1;
}

async function getItems() {
  const response = await fetch('api/get')
  const items = await response.json()
  return items
}

async function removeItem(id) {
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