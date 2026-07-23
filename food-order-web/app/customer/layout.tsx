"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import FormsInput from "@/components/widgets/forms/forms-input"
import PageTitle from "@/components/widgets/page-title"
import * as accountService from "@/lib/action/customer/account.action"
import { ChangePasswordForm, ChangePasswordSchema } from "@/lib/model/form/security.schema"
import {
    DashboardCircleIcon,
    LockPasswordIcon,
    Logout02Icon,
    ShoppingBag,
    Save,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import React from "react"
import { signOutAction } from "@/lib/action/anonymous/auth.action"
import { useLoginUser } from "@/lib/state/login-user.context"
import { useRouter } from "next/navigation"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    const [changingPassword, setChangingPassword] = useState(false)
    const { setLoginUser } = useLoginUser()
    const router = useRouter()

    const passwordForm = useForm<ChangePasswordForm>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            email: "",
            oldPass: "",
            newPass: "",
            confPass: "",
        },
    })

    const startChangePassword = () => {
        passwordForm.reset({ email: "", oldPass: "", newPass: "", confPass: "" })
        setChangingPassword(true)
    }

    const changePassword = async (values: ChangePasswordForm) => {
        await accountService.changePassword(values)
        setChangingPassword(false)
    }

    async function signOut() {
        await signOutAction()
        setLoginUser(undefined)
        router.replace("/")
    }

    return (
        <div>
            <PageTitle
                title="Customer Portal"
                action={
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={"/customer"}>
                                <HugeiconsIcon icon={DashboardCircleIcon} /> Dashboard
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={"/customer/orders"}>
                                <HugeiconsIcon icon={ShoppingBag} /> Order History
                            </Link>
                        </Button>
                        <Button variant="outline" onClick={startChangePassword}>
                            <HugeiconsIcon icon={LockPasswordIcon} /> Change Password
                        </Button>
                        <Button variant="outline" onClick={signOut}>
                            <HugeiconsIcon icon={Logout02Icon} /> Sign Out
                        </Button>
                    </div>
                }
            />
            <section>{children}</section>

            <Dialog open={changingPassword} onOpenChange={setChangingPassword}>
                <DialogContent>
                    <form onSubmit={passwordForm.handleSubmit(changePassword)}>
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                        </DialogHeader>

                        <section className="my-4 space-y-4">
                            <FormsInput
                                control={passwordForm.control}
                                path="oldPass"
                                type="password"
                                label="Current Password"
                            />
                            <FormsInput
                                control={passwordForm.control}
                                path="newPass"
                                type="password"
                                label="New Password"
                            />
                            <FormsInput
                                control={passwordForm.control}
                                path="confPass"
                                type="password"
                                label="Confirm Password"
                            />
                        </section>

                        <DialogFooter>
                            <Button type="submit">
                                <HugeiconsIcon icon={Save} size={14} /> Update Password
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
