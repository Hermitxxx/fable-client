'use server'
import { revalidatePath } from "next/cache";
import { serverMutate } from "../core/server";

// publish or unpublish a book
export async function bookParchment(data) {
    const result = await serverMutate(`/api/books`, data, 'PATCH')
    revalidatePath('/dashboard/admin/books')
    revalidatePath('/books')
    return result
}

// delete a book
export async function deleteBook(id) {
    const result = await serverMutate(`/api/books/${id}`, null, 'DELETE')
    revalidatePath('/dashboard/admin/books')
    revalidatePath('/books')
    return result
}