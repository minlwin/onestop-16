import { cookies } from "next/headers"

export async function setTokens(tokens : {access : string, refresh: string}) {
    const cookieStore = await cookies()
    const props = {
        httpOnly: true,
        maxAge: 30 * 60,
        secure: process.env.NODE_ENV === 'production'
    }

    cookieStore.set({ name : 'access', value : tokens.access, ...props })
    cookieStore.set({ name : 'refresh', value : tokens.refresh, ...props })
}

export async function clearTokens() {
    const cookieStore = await cookies()
    cookieStore.delete('access')
    cookieStore.delete('refresh')
}