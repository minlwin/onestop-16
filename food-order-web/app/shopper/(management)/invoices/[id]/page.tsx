"use client"

import { usePageTitle } from "@/app/shopper/_states/page-title-provider"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import InvoiceDetailsWidget from "@/components/widgets/invoice-details-widget"
import LoadingWidget from "@/components/widgets/loading-widget"

export default function InvoiceDetailsPage() {
    const { setTitle } = usePageTitle()
    useEffect(() => setTitle("Invoice Details"), [])

    const { id } = useParams()

    if (!id) {
        return <LoadingWidget />
    }

    return <InvoiceDetailsWidget id={id as string} />
}
