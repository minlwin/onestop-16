"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowRight, SignOut } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePageTitle } from "../_states/page-title-provider"
import Link from "next/link"
import { signOutAction } from "@/lib/action/anonymous/auth.action"
import { useLoginUser } from "@/lib/state/login-user.context"
import { useRouter } from "next/navigation"

export default function ManagementHeader() {
    const { title } = usePageTitle()
    const {setLoginUser} = useLoginUser()
    const router = useRouter()

    async function signOut() {
        await signOutAction()
        setLoginUser(undefined)
        router.replace('/signin')
    }

    return (
        <header className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <SidebarTrigger size={"lg"} />
                    <Link href={'/shopper'} className="uppercase">Food Order</Link>
                </div>

                <HugeiconsIcon icon={ArrowRight} size={20} />

                <div>
                    <h1 className="uppercase">{title || "Dashboard"}</h1>
                </div>
            </div>

            <Button variant={"ghost"} onClick={signOut}>
                <HugeiconsIcon icon={SignOut} />
                <span>Sign Out</span>
            </Button>
        </header>
    )
}
