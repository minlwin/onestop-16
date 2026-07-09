"use server"

import * as client from "@/lib/client/shopper/management/orders.client"
import { OrderCuisineSummary, WeeklyInvoiceItem } from "@/lib/model/output/management.model"

export async function weeklyInvoices(): Promise<WeeklyInvoiceItem[]> {
    return await client.weeklyInvoices()
}

export async function cuisineSummary(): Promise<OrderCuisineSummary[]> {
    return await client.cuisineSummary()
}
