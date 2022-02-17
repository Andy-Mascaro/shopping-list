export function renderItem(item) {
    const p = document.createElement('p');
    const div = document.createElement('div');
    div.classList.add(item.complete ? 'complete' : 'incomplete');
    dispatchEvent.classList.add('item');

    p.textContent = item.item;

    div.append(p);
    return div;
} 