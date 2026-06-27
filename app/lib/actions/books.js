'use server'
import { revalidatePath } from "next/cache";
import { serverMutate } from "../core/server";

// publish or unpublish a book (admin fucntion)
export async function bookParchment(data) {
    const result = await serverMutate(`/api/books`, data, 'PATCH')
    revalidatePath('/dashboard/admin/books')
    revalidatePath('/dashboard/writer')
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

// upload a book (writer function)
export async function uploadBook(data) {
    const result = await serverMutate(`/api/books`, data, 'POST')
    revalidatePath('/dashboard/writer/ebooks')
    revalidatePath('/dashboard/writer/add-ebook')
    revalidatePath('/books')
    return result
}

// update a book (writer function)
export async function updateBook(id, data) {
    const result = await serverMutate(`/api/books/${id}`, data, 'PATCH')
    revalidatePath('/dashboard/writer/ebooks')
    revalidatePath('/books')
    return result
}