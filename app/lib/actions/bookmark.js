'use server'
import { revalidatePath } from "next/cache"
import { serverMutate } from "../core/server"

// add a book to bookmark 
export async function addToBookmark(data) {
    const result = await serverMutate(`/api/bookmarks`, data, 'POST')
    revalidatePath('/dashboard/writer/bookmarks')
    return result
}

// remove from bookmark
export async function removeBookmark(id) {
    const result = await serverMutate(`/api/bookmarks/${id}`, null, 'DELETE')
    revalidatePath('/dashboard/writer/bookmarks')
    return result
}