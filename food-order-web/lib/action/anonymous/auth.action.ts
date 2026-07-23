"use server"

import * as client from "@/lib/client/anonymous/auth.client"
import { SignInForm } from "@/lib/model/form/security.schema"
import { UserInfo } from "@/lib/model/output/security.model"
import { setTokens } from "@/lib/security"
import * as security from "@/lib/security"

export async function signInAction(form: SignInForm) : Promise<UserInfo> {
    const {accessToken, refreshToken, ...userInfo} = await client.generateToken(form)
    await setTokens({
        access: accessToken,
        refresh: refreshToken
    })
    return userInfo
}

export async function signOutAction() {
    await security.clearTokens()
}