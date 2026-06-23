import { secureFetch } from "../core/server";

export async function getAllUsers() {
    const { data } = await secureFetch(`/api/users`)
    return data
}