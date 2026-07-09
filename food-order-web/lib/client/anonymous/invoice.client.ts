import "server-only"

import { InvoiceDetails } from "@/lib/model/output/management.model"
import { ModificationResult } from "@/lib/model"
import { CheckoutForm } from "@/lib/model/form/checkout.schema"
import { CartItem } from "@/lib/model/output/cart.model"

export async function checkout(
    form: CheckoutForm,
    items: CartItem[]
): Promise<ModificationResult<string>> {
    return {
        id: "INV-0001",
    }
}

export async function findById(id: any): Promise<InvoiceDetails> {
    return {
        id: String(id),
        status: "Invoiced",
        invoiceDate: "2026-01-01",
        statusChangedAt: "2026-01-01 10:00",
        customer: {
            name: "Guest Customer",
            phone: "09-000-000-000",
            email: "guest@example.com",
        },
        delivery: {
            label: "Home",
            address: "No. 1, Sample Street",
            township: "Sample Township",
            fees: 1000,
            dispatchDate: "2026-01-02",
            timeFrom: "09:00AM",
            timeTo: "11:00AM",
            remark: "Please call before delivery.",
        },
        items: [
            { id: "1", cuisine: "Chicken Curry", quantity: 2, price: 3500 },
            { id: "2", cuisine: "Mohinga", quantity: 1, price: 2000 },
        ],
    }
}
