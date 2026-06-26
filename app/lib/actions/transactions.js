import { serverMutate } from "../core/server"

export async function insertTransaction(data) {
    const result = await serverMutate(`/api/transactions`, data, 'POST')
    return result
}