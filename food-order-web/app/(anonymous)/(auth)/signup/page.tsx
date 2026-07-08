"use client"
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import { SignUpForm, SignUpSchema } from "@/lib/model/form/security.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckFreeIcons, Login02Icon, UserAdd02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import AuthTitle from "../_widget/auth_title"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
    const router = useRouter()

    const form = useForm<SignUpForm>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: SignUpForm) => {
        router.replace("/customer")
    }

    return (
        <section className="w-1/2">
            <AuthTitle icon={UserAdd02Icon} title="Sign Up" />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormsInput
                    control={form.control}
                    path="name"
                    label="Name"
                    placeholder="Please enter your name"
                    className="mb-4"
                />
                <FormsInput
                    control={form.control}
                    path="email"
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
                        <HugeiconsIcon icon={CheckFreeIcons} /> Sign Up
                    </Button>

                    <Button type="button" asChild variant={"outline"}>
                        <Link href={"/signin"}>
                            <HugeiconsIcon icon={Login02Icon} /> Sign In
                        </Link>
                    </Button>
                </div>
            </form>
        </section>
    )
}
