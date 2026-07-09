import "server-only"

import { InvoiceSearchForm } from "@/lib/model/form/management.schema"
import { InvoiceDetails, InvoiceListItem } from "@/lib/model/output/management.model"

export async function search(form: InvoiceSearchForm): Promise<InvoiceListItem[]> {
    return MOCK_INVOICES.filter((data) => {
        if (form.status && data.status != form.status) {
            return false
        }

        if (form.from && data.invoiceDate < form.from) {
            return false
        }

        if (form.to && data.invoiceDate > form.to) {
            return false
        }

        if (
            form.keyword &&
            !(
                data.customer.toLocaleLowerCase().includes(form.keyword.toLocaleLowerCase()) ||
                data.id.includes(form.keyword)
            )
        ) {
            return false
        }

        return true
    })
}

export async function findById(id: any): Promise<InvoiceDetails> {
    return {
        ...MOCK_INVOICE,
        id: String(id),
    }
}

export const MOCK_INVOICE: InvoiceDetails = {
    id: "202606010001",
    status: "Confirmed",
    invoiceDate: "2026-06-28",
    statusChangedAt: "2026-06-28 09:00am",
    customer: {
        name: "U Win Ko",
        phone: "0917181777",
        email: "winko@gmail.com",
    },
    delivery: {
        label: "Home",
        address: "No. 12, 5th Street",
        township: "Kamayut",
        dispatchDate: "2026-06-30",
        timeFrom: "09:00AM",
        timeTo: "11:00AM",
        fees: 3000,
        remark: "Leave at the front gate if no one answers.",
    },
    items: [
        { id: "1", cuisine: "Chicken Curry", quantity: 2, price: 18000 },
        { id: "2", cuisine: "Fish Curry", quantity: 3, price: 15000 },
        { id: "3", cuisine: "Ginger Salad", quantity: 1, price: 7000 },
    ],
}

export const MOCK_INVOICES: InvoiceListItem[] = [
    {
        id: "202606010001",
        customer: "U Win Ko",
        phone: "0917181777",
        invoiceDate: "2026-06-28",
        status: "Confirmed",
        statusChangedAt: "2026-06-28 09:00am",
        amount: 90000,
    },
    {
        id: "202606010002",
        customer: "Thidar",
        phone: "0978181817",
        invoiceDate: "2026-06-27",
        status: "Delivered",
        statusChangedAt: "2026-06-27 15:00pm",
        amount: 45000,
    },
    {
        id: "202606010003",
        customer: "Aung Aung",
        phone: "0912345678",
        invoiceDate: "2026-06-26",
        status: "Canceled",
        statusChangedAt: "2026-06-26 10:00am",
        amount: 32000,
    },
]
