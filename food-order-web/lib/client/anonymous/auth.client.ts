import 'server-only'

import { SignInForm } from "@/lib/model/form/security.schema";
import { AuthResult } from "@/lib/model/output/security.model";
import { POST_OPTION, request } from "@/lib/client"

export async function generateToken(form: SignInForm) : Promise<AuthResult> {
    return await request('anonymous/token/generate', {
        ...POST_OPTION,
        body: JSON.stringify(form)
    })
}