const SUPABASE_URL = 'https://nschbtdnjkjkoshunkhk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2hidGRuamtqa29zaHVua2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MzYwMjAsImV4cCI6MTk2MDAxMjAyMH0.mwm25ysgqkbA7ZMQcYTguKcFC-qRnmiDHgK2PxCROPk';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session();
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./items');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function createItem(items) {
    const resp = await client.from('items').insert({ items, complete: false, user_id: client.auth.user().id, })
        .single();
    return checkError(resp);
}

export async function getItems() {
    const resp = await client.from('items').select().order('complete').match({ user_id: client.auth.user().id, });
    return checkError(resp);
}

export async function deleteAllItems() {
    const resp = await client.from('items').delete({ user_id: client.auth.user().id, });
    return checkError(resp);
}

export async function boughtItem(id) {
    const resp = await client.from('items').update({ complete: true }).match({ user_id: client.auth.user().id, id: id });
    return checkError(resp);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}









