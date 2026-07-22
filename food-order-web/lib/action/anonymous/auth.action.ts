"use server"

import * as client from "@/lib/client/anonymous/auth.client"
import { SignInForm } from "@/lib/model/form/security.schema"
import { UserInfo } from "@/lib/model/output/security.model"
import { cookies } from "next/headers"

export async function signInAction(form: SignInForm) : Promise<UserInfo> {
    const {accessToken, refreshToken, ...userInfo} = await client.generateToken(form)

    const cookieStore = await cookies()
    cookieStore.set({
        name: 'tokens',
        value: JSON.stringify({
            access: accessToken,
            refresh : refreshToken
        }),
        httpOnly: true,
        maxAge: 30 * 60,
        secure: process.env.NODE_ENV === 'production'
    })

    return userInfo
}