import { checkAuth, logout, checkAuth, logout, creatList, deleteAllLists } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const listsEl = document.querySelector('.todos');
const listForm = document.querySelector('.todo-form');
const deleteButton = document.querySelector('.delete-button');

logoutButton.addEventListener('click', () => {
    logout();
});

listForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(listForm);
    const list = listData.get('list');
    await createList(list);
    listForm.reset();
    displayLists();

    
   
});

async function displayLists() {
    const lists = await getLists();

    listsEl.textContent = '';
    
    for (let list of lists) {
        const listEl = renderList(list);

        listEl.addEventListener('click', async() => {
            
            await completeList(list.id);
            displayLists();
        });
        listsEl.append(listEl);
    }


}
window.addEventListener('load', async() => {
    displayLists();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    await deleteAllTodos();

    displayTodos();
});

