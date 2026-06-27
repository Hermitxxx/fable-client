import { openFetch, secureFetch } from "../core/server";

// get top writers
export async function getTopWriters() {
    const data = await openFetch('/api/top-writers')
    return data;
}

export async function getAllWriters() {
    const data = await openFetch('/api/writers')
    return data;
}

// get a writer's stats for the writer's dashboard
export async function getWriterStats(id) {
    const data = await secureFetch(`/api/writer-stats?writerId=${id}`)
    return data
}