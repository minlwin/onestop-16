import { cookies } from 'next/headers'
import 'server-only'
import * as security from '../security'
import { redirect } from 'next/navigation'

interface SearchParam {
    [name:string] : any
}

interface ClientRequest {
    path: string
    options? : RequestInit 
    params?: SearchParam
}

export async function anonymousRequest(request : ClientRequest) {
    const response = await fetch(url(request.path, request.params), request.options)

    if(!response.ok) {
        const error = {
            status : response.status,
            messages : await response.json()
        }
        throw new Error(JSON.stringify(error))
    }

    return await response.json()
}

export async function securedRequest(request : ClientRequest) {
  
    async function fetchWithToken(token : string) {
        return await fetch(url(request.path, request.params), {
            ...request.options,
            headers: {
                ...request.options?.headers,
                'Authorization' : token
            }
        })
    }

    const accessToken = await getToken('access')

    if(!accessToken) {
        await security.clearTokens()
        redirect("/signin")
    }

    let response = await fetchWithToken(accessToken)

    if(response.status === 410) {
        const { accessToken, refreshToken } = await anonymousRequest({
            path: '',
            options: {
                ...POST_OPTION,
                body: JSON.stringify({
                    token : await getToken('refresh')
                })
            }
        })

        await security.setTokens({access : accessToken, refresh :refreshToken})

        response = await fetchWithToken(accessToken)
    }

    if(response.status === 401 || response.status === 403) {
        await security.clearTokens()
        redirect("/signin")
    }

    if(!response.ok) {
        const error = {
            status : response.status,
            messages : await response.json()
        }
        throw new Error(JSON.stringify(error))
    }

    return await response.json()
}

async function getToken(type : 'access' | 'refresh') {
    const cookieStore = await cookies()
    const cookie = cookieStore.get(type)

    if(cookie) {
        return cookie.value
    }
}

function url(path:string, params: SearchParam = {}):URL {
    const baseUrl = process.env.BASE_URL

    if(!baseUrl) {
        throw Error("There is no Base URL Setting in environment file.")
    }

    const url = new URL(`${baseUrl}/${path}`)

    for(const [key, value] of Object.entries(params)) {
        if(value) {
            url.searchParams.append(key, value)
        }
    }

    return url
}

export const POST_OPTION:RequestInit = {
    method: "POST",
    headers: {
        'Content-Type' : 'application/json'
    }
}

export const PUT_OPTION:RequestInit = {
    method: "PUT",
    headers: {
        'Content-Type' : 'application/json'
    }
}