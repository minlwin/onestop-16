import { Button } from "@/components/ui/button"
import PageTitle from "@/components/widgets/page-title"
import { DashboardCircleIcon, Logout02Icon, ShoppingBag } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Metadata } from "next"
import Link from "next/link"
import React from "react"

export const metadata: Metadata = {
    title: "Foods Order | Web Portal",
    description: "Foods Order Management System",
}

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
            <div>
                <PageTitle
                    title="Customer Portal"
                    action={
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href={'/customer'}>
                                    <HugeiconsIcon icon={DashboardCircleIcon} /> Dashboard
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={'/customer/orders'}>
                                    <HugeiconsIcon icon={ShoppingBag} /> Order History
                                </Link>
                            </Button>
                            <Button variant="outline">
                                <HugeiconsIcon icon={Logout02Icon} /> Sign Out
                            </Button>
                        </div>
                    }
                />
                <section>{children}</section>
            </div>
    )
}
