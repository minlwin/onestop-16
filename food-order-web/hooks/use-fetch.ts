import { DependencyList, useEffect, useState } from "react"

export function useFetch<T>(fetcher: () => Promise<T> | undefined, deps: DependencyList) {
    const [data, setData] = useState<T>()

    useEffect(() => {
        const promise = fetcher()
        if (!promise) return

        let active = true
        promise.then((result) => {
            if (active) setData(result)
        })

        return () => {
            active = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return [data, setData] as const
}
