import { checkAuth, logout, createItem, deleteAllItems, boughtItem, getItems } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';
checkAuth();

const logoutButton = document.querySelector('#logout');
const itemsEl = document.querySelector('#items');
const itemForm = document.querySelector('.item-form');
const deleteButton = document.querySelector('.delete-button');

logoutButton.addEventListener('click', () => {
    logout();
});

itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(itemForm);
    const item = formData.get('item');
    await createItem(item);
    itemForm.reset();
    displayItems();

    
   
});

async function displayItems() {
    

    itemsEl.textContent = '';
    const items = await getItems();
    
    for (let item of items) {
        const itemEl = renderItem(item);
        itemEl.addEventListener('click', async () => {
            await boughtItem(item.id);
            displayItems();
        });
        itemsEl.append(itemEl);
    }


}

window.addEventListener('load', async () => {
    displayItems();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    await deleteAllItems();

    displayItems();


});

