"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowRight, ArrowRight02FreeIcons, SignOut } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { usePageTitle } from "../_states/page-title-provider"

export default function ManagementHeader() {
    const { title } = usePageTitle()

    return (
        <header className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <SidebarTrigger size={"lg"} />
                    <h1 className="uppercase">Food Order</h1>
                </div>

                <HugeiconsIcon icon={ArrowRight} size={20} />

                <div>
                    <h1 className="uppercase">{title || "Dashboard"}</h1>
                </div>
            </div>

            <Button variant={"ghost"}>
                <HugeiconsIcon icon={SignOut} />
                <span>Sign Out</span>
            </Button>
        </header>
    )
}
