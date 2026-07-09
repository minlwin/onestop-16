import PageTitle from "@/components/widgets/page-title"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Login01Icon } from "@hugeicons/core-free-icons"
import Link from "next/link"
import React from "react"
import { CartProvider } from "./_states/cart-provider"

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <div>
                <PageTitle
                    title="Take Order"
                    action={
                        <Button asChild variant="outline">
                            <Link href="/signin">
                                <HugeiconsIcon icon={Login01Icon} /> Sign In
                            </Link>
                        </Button>
                    }
                />
                <section>{children}</section>
            </div>
        </CartProvider>
    )
}
