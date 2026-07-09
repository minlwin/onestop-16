import "server-only"

import { OrderCuisineSummary, WeeklyInvoiceItem } from "@/lib/model/output/management.model"

export async function weeklyInvoices(): Promise<WeeklyInvoiceItem[]> {
    return MOCK_WEEKLY_INVOICES
}

export async function cuisineSummary(): Promise<OrderCuisineSummary[]> {
    return MOCK_CUISINE_SUMMARY
}

const MOCK_WEEKLY_INVOICES: WeeklyInvoiceItem[] = [
    {
        id: "202606010001",
        customer: "U Win Ko",
        confirmDate: "2026-06-03",
        deliveryDate: "2026-06-05",
    },
    {
        id: "202606010002",
        customer: "Thidar",
        confirmDate: "2026-06-04",
        deliveryDate: "2026-06-06",
    },
]

const MOCK_CUISINE_SUMMARY: OrderCuisineSummary[] = [
    { cuisine: "Curry", quantity: 89 },
    { cuisine: "Soup", quantity: 34 },
    { cuisine: "Noodle", quantity: 52 },
]
