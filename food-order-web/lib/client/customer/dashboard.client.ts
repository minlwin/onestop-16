import "server-only"

import { CuisineListItem } from "@/lib/model/output/master-data.model"
import { InvoiceListItem, OrderCuisineSummary } from "@/lib/model/output/management.model"

const MOCK_RECENT_ORDERS: InvoiceListItem[] = [
    {
        id: "202606010004",
        customer: "U Win Ko",
        phone: "0917181777",
        invoiceDate: "2026-06-29",
        status: "Invoiced",
        statusChangedAt: "2026-06-29 08:10am",
        amount: 52000,
    },
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
        id: "202605280002",
        customer: "U Win Ko",
        phone: "0917181777",
        invoiceDate: "2026-05-28",
        status: "Delivered",
        statusChangedAt: "2026-05-28 15:00pm",
        amount: 45000,
    },
]

const MOCK_FAVORITE_CUISINES: OrderCuisineSummary[] = [
    { cuisine: "Chicken Curry", quantity: 12 },
    { cuisine: "Shan Noodle", quantity: 8 },
    { cuisine: "Mohinga", quantity: 5 },
]

const MOCK_WEEKLY_SPECIALS: CuisineListItem[] = [
    {
        id: 1,
        name: "Chicken Curry",
        category: { id: 1, name: "Curry" },
        spiceLevel: "Medium",
        isRegular: true,
        price: 3500,
        description: "Slow cooked chicken curry with coconut milk and Myanmar spices.",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 5,
        name: "Shan Noodle",
        category: { id: 3, name: "Noodle" },
        spiceLevel: "Mild",
        isRegular: true,
        price: 2500,
        description: "Flat rice noodles tossed in a savory tomato and pork sauce.",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 6,
        name: "Mohinga",
        category: { id: 3, name: "Noodle" },
        spiceLevel: "Medium",
        isRegular: true,
        price: 2000,
        description: "Myanmar's beloved breakfast noodle soup with a fragrant catfish broth.",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
]

export async function recentOrders(): Promise<InvoiceListItem[]> {
    return MOCK_RECENT_ORDERS
}

export async function favoriteCuisines(): Promise<OrderCuisineSummary[]> {
    return MOCK_FAVORITE_CUISINES
}

export async function weeklySpecials(): Promise<CuisineListItem[]> {
    return MOCK_WEEKLY_SPECIALS
}
