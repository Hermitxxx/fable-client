'use server'
import { revalidatePath } from "next/cache";
import { serverMutate } from "../core/server";

export async function updateUserRole(data) {
    const result = await serverMutate(`/api/users`, data, 'PATCH')
    revalidatePath('/dashboard/admin/users')
    return result
}