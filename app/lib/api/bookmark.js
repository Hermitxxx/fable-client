import { secureFetch } from "../core/server";

// get all bookmarkBooks 
export async function getBookmarkBooks(userId) {
    const data = await secureFetch(`/api/bookmarks?userId=${userId}`)
    return data;
}