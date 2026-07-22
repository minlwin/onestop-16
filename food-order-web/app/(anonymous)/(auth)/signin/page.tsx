"use client"

import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import { SignInForm, SignInSchema } from "@/lib/model/form/security.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    CheckFreeIcons,
    Login02Icon,
    UserAdd02FreeIcons,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import AuthTitle from "../_widget/auth_title"
import { useRouter } from "next/navigation"
import * as authAction from "@/lib/action/anonymous/auth.action"
import { useLoginUser } from "@/lib/state/login-user.context"
import { homeForUser } from "@/lib/utils"
import { safeCall } from "@/lib/action/safe-call"

export default function SignInPage() {
    const router = useRouter()
    const { setLoginUser } = useLoginUser()

    const form = useForm<SignInForm>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = async (data: SignInForm) => {
        safeCall(async () => {
            const result = await authAction.signInAction(data)
            setLoginUser(result)
            router.replace(homeForUser(result))
        })
    }

    return (
        <section className="w-1/2">
            <AuthTitle icon={Login02Icon} title="Sign In" />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormsInput
                    control={form.control}
                    path="username"
                    type="email"
                    label="Email"
                    placeholder="Please enter email for login"
                    className="mb-4"
                />
                <FormsInput
                    control={form.control}
                    path="password"
                    type="password"
                    label="Password"
                    placeholder="Please enter password"
                    className="mb-4"
                />

                <div className="space-x-2">
                    <Button type="submit">
                        <HugeiconsIcon icon={CheckFreeIcons} /> Sign In
                    </Button>

                    <Button type="button" asChild variant={"outline"}>
                        <Link href={"/signup"}>
                            <HugeiconsIcon icon={UserAdd02FreeIcons} /> Sign Up
                        </Link>
                    </Button>
                </div>
            </form>
        </section>
    )
}
