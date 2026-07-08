import PageTitle from "@/components/widgets/page-title"
import React from "react"

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <PageTitle title="Take Order" />
            <section>{children}</section>
        </div>
    )
}
