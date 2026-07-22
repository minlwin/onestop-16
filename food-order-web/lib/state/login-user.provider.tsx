'use client'

import React, { useState } from "react";
import { LoginUserContext } from "./login-user.context";
import { UserInfo } from "../model/output/security.model";

export default function LoginUserProvider({children} : {children : React.ReactNode}) {

    const [user, setUser] = useState<UserInfo>()

    return (
        <LoginUserContext.Provider value={{loginUser: user, setLoginUser : setUser}}>
            {children}
        </LoginUserContext.Provider>
    )
}