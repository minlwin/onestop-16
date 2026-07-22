import { createContext, useContext } from "react";
import { UserInfo } from "../model/output/security.model";

type State = {
    loginUser?: UserInfo,
    setLoginUser: (user?: UserInfo) => void
}

export const LoginUserContext = createContext<State | undefined>(undefined)

export function useLoginUser() {
    const context = useContext(LoginUserContext)

    if(!context) {
        throw new Error("Invalid usage of Login User Context")
    }

    return context
}