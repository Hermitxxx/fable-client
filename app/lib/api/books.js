import { openFetch, secureFetch } from "../core/server";


// get featured books
export async function getFeaturedBooks() {
    const { data } = await openFetch('/api/featured-books')
    return data;
}

// get all books
export async function getAllBooks(queryString = "") {
    const url = queryString
        ? `/api/books?${queryString}`
        : `/api/books`;
    const { data } = await openFetch(url)
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

// get books for admin dashboard
export async function getAllBooksAdmin(queryString = "") {
    const url = queryString
        ? `/api/books-admin?${queryString}`
        : `/api/books-admin`;
    const { data } = await openFetch(url)
    return data;
}