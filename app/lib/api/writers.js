import { openFetch, secureFetch } from "../core/server";

// get top writers
export async function getTopWriters() {
    const { data, message } = await openFetch('/api/top-writers')
    return data;
}

// get a writer's stats for the writer's dashboard
export async function getWriterStats(id) {
    const data = await secureFetch(`/api/writer-stats?writerId=${id}`)
    return data
}