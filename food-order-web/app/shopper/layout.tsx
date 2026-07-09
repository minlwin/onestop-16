import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"
import { ManagementMenu } from "./_widgets/management-menu"
import { Metadata } from "next"
import ManagementHeader from "./_widgets/management-header"
import { PageTitleContextProvider } from "./_states/page-title-provider"

export const metadata: Metadata = {
    title: "Foods Order | Management",
    description: "Foods Order Management System",
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <PageTitleContextProvider>
                <ManagementMenu />
                <div className="w-full">
                    <ManagementHeader />
                    <main className="px-8">{children}</main>
                </div>
            </PageTitleContextProvider>
        </SidebarProvider>
    )
}
