import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { SignOut } from "@hugeicons/core-free-icons";
import { ManagementMenu } from "./_widgets/management-menu";

export default function ShopLayout({children} : {children : React.ReactNode}) {

    return (
        <SidebarProvider>
            <ManagementMenu />
            <div className="w-full">
                <header className="flex justify-between items-center px-8 py-4">
                    <div className="flex items-center">
                        <SidebarTrigger size={"lg"} />
                        <h1 className="uppercase">Food Order</h1>
                    </div>

                    <Button variant={'ghost'}>
                        <HugeiconsIcon icon={SignOut} />
                        <span>Sign Out</span>
                    </Button>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}