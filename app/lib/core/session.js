import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export async function getUserSession() {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    return session;

}

export const requireRole = async (role) => {
    const session = await getUserSession()
    const user = session?.user
    if (!user) {
        redirect('/login')
    }
    if (user?.role !== role) {
        redirect('/unauthorized')
    }
    return user;
}

export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.session?.token || null;
}