import "server-only"

import { OrderCuisineSummary, WeeklyInvoiceItem } from "@/lib/model/output/management.model"
import { securedRequest } from "@/lib/client"

const PATH = 'shopper/management/orders'

export async function weeklyInvoices(): Promise<WeeklyInvoiceItem[]> {
    return await securedRequest({path : `${PATH}/weekly-invoices`})
}

export async function cuisineSummary(): Promise<OrderCuisineSummary[]> {
    return await securedRequest({path : `${PATH}/cuisine-summary`})
}