import { openFetch, secureFetch } from "../core/server";


// get featured books
export async function getFeaturedBooks() {
    const { data } = await openFetch('/api/featured-books')
    return data;
}

// get all books
export async function getAllBooks() {
    const { data } = await openFetch('/api/books')
    return data;
}

// get book details by id
export async function getBookDetailsById(id) {
    const data = await secureFetch(`/api/books/${id}`)
    return data;
}

// get a writer's books
export async function getBooksByWriterId(id) {
    const data = await secureFetch(`/api/writer-books?writerId=${id}`)
    console.log(data);
    return data;
}