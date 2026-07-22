import 'server-only'

interface SearchParam {
    [name:string] : any
}

export async function request(
    path: string, 
    options : RequestInit = {}, 
    params: SearchParam = {}
) {
    const response = await fetch(url(path, params), options)

    if(!response.ok) {
        const error = {
            status : response.status,
            messages : await response.json()
        }
        throw new Error(JSON.stringify(error))
    }

    return await response.json()
}

export async function securedRequest() {
    
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