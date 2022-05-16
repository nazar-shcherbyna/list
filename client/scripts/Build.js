class Build {
    static item({id, text, flag, num, date}) {
        return `<li>
            <div class="cell">${id}</div>
            <div class="cell">${text}</div>
            <div class="cell"><input type="checkbox" ${flag && 'checked'}></div>
            <div class="cell">${num}</div>
            <div class="cell">${date}</div>
            <div class="cell"><button data-id=${id}>🗑</button></div>
        </li>`
    }
}

export default Build