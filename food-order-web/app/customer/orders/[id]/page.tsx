"use client"

import { useParams } from "next/navigation"
import OrderDetailsWidget from "@/components/widgets/order-details-widget"
import LoadingWidget from "@/components/widgets/loading-widget"

export default function OrderDetails() {
    const { id } = useParams()

    if (!id) {
        return <LoadingWidget />
    }

    return (
        <div className="px-20 pb-8">
            <OrderDetailsWidget id={id as string} />
        </div>
    )
}
