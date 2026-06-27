import { API_BASE_URL } from "../constants"
import { getUserToken } from "./session";

export const authHeader = async () => {
    const token = await getUserToken();
    console.log(token);
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export async function openFetch(path) {
    try {
        const res = await fetch(`${API_BASE_URL}${path}`)
        return handleStatusCode(res);
    } catch (error) {
        return { success: false, message: 'Something went wrong' }
    }
}



export async function secureFetch(path) {
    try {
        const res = await fetch(`${API_BASE_URL}${path}`, {
            headers: await authHeader()
        })
        return handleStatusCode(res);
    } catch (error) {
        return { success: false, message: 'Something went wrong' }
    }
}


// data mutation functions

export async function serverMutate(path, data = null, method = 'POST') {
    const options = {
        method: method,
        headers: {
            'content-type': 'application/json',
            ... await authHeader()
        },
    }

    if (data !== null) {
        options.body = JSON.stringify(data)
    }

    const res = await fetch(`${API_BASE_URL}${path}`, options)

    return handleStatusCode(res)
}


// handle errors status

const handleStatusCode = res => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    else if (res.status === 403) {
        redirect('/forbidden');
    }

    return res.json()
}