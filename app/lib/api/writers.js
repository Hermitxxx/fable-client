import { openFetch } from "../core/server";

// get top writers
export async function getTopWriters() {
    const { data, message } = await openFetch('/api/top-writers')
    return data;
}