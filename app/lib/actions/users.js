'use server'
import { revalidatePath } from "next/cache";
import { serverMutate } from "../core/server";

export async function updateUserRole(data) {
    const result = await serverMutate(`/api/users`, data, 'PATCH')
    revalidatePath('/dashboard/admin/users')
    return result
}

// delete a user
export async function deleteUser(id) {
    const result = await serverMutate(`/api/users/${id}`, null, 'DELETE')
    revalidatePath('/dashboard/admin/books')
    revalidatePath('/books')
    return result
}