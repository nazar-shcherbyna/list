import Build from "./Build.js";

export function render(items) {
    itemList.innerHTML = items.map(Build.item).join('');
}