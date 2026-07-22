export type ModificationResult<T> = {
    id: T
}

export type Status = "Pending" | "Enable"

export type Pager = {
    page: number
    size: number
    totalCount: number
    totalPage: number
    links: number[]
}

export type PageResult<T> = {
    contents: T[]
    pager: Pager
}

export type PageSearch = {
    page?: number
    size?: number
}

export const NO_RESULT_PAGER: Pager = {
    page: 0,
    size: 10,
    totalCount: 0,
    totalPage: 0,
    links: [],
}

export type ClientError = {
    status : 400 | 401 | 403 | 500
    messages : string[]
}