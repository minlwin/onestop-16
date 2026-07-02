'use client'

import React, { createContext, useContext, useState } from "react"

type PageTitleContextType = {
    title: string
    setTitle: (title:string) => void
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined)

export function usePageTitle() {
    const context = useContext(PageTitleContext)

    if(!context) {
        throw Error("Invalid usage of paget title context.")
    }

    return context;
}

export function PageTitleContextProvider({children} : {children : React.ReactNode}) {
    
    const [state, setState] = useState("")

    return (
        <PageTitleContext.Provider value={{title: state, setTitle: setState}}>
            {children}
        </PageTitleContext.Provider>
    )
}