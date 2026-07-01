import PageTitle from "@/components/widgets/page-title";
import { ShoppingBag, ShoppingBag02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export default function CheckLayout({children} : {children : React.ReactNode}) {

    return (
        <div>
            <PageTitle title="Check Status" />
            <section>
                {children}
            </section>
        </div>
    )
}