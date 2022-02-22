export function renderItem(item) {
    const p = document.createElement('p');
    const div = document.createElement('div');
    div.classList.add(item.complete ? 'complete' : 'incomplete');
    div.classList.add('items');

    p.textContent = item.items;

    div.append(p);
    return div;
} 