const SUPABASE_URL = 'https://nschbtdnjkjkoshunkhk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2hidGRuamtqa29zaHVua2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MzYwMjAsImV4cCI6MTk2MDAxMjAyMH0.mwm25ysgqkbA7ZMQcYTguKcFC-qRnmiDHgK2PxCROPk';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
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

export async function createList(list) {
    const resp = await client.from('lists').insert({ list, complete: false, user_id: client.auth.user().id, })
        .single();
    return checkError(resp);
}

export async function getLists() {
    const resp = await client.from('lists').select().order('complete').match({ user_id: client.auth.user().id, });
    return checkError(resp);
}

export async function deleteAllLists() {
    const resp = await client.from('lists').delete({ user_id: client.auth.user().id, });
    return checkError(resp);
}

export async function completeList(id) {
    const resp = await client.from('lists').update({ complete: true }).match({ user_id: client.auth.user().id, id: id });
    return checkError(resp);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}









// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
