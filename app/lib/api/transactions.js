import { openFetch, secureFetch } from "../core/server";

// get top writers
export async function getPurchasedBooks(id) {
    const data = await openFetch(`/api/purchased-books?buyerId=${id}`)
    return data;
}

// get top writers
export async function getAllTrans() {
    const data = await secureFetch(`/api/transactions`)
    return data;
}