import 'server-only'

import { SignInForm } from "@/lib/model/form/security.schema";
import { AuthResult } from "@/lib/model/output/security.model";
import { POST_OPTION, anonymousRequest } from "@/lib/client"

export async function generateToken(form: SignInForm) : Promise<AuthResult> {
    return await anonymousRequest({
        path: 'anonymous/token/generate',
        options: {
            ...POST_OPTION,
            body: JSON.stringify(form)
        }
    })
}