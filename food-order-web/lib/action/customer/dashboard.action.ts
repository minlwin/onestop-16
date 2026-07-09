"use server"

import * as client from "@/lib/client/customer/dashboard.client"
import { CuisineListItem } from "@/lib/model/output/master-data.model"
import { InvoiceListItem, OrderCuisineSummary } from "@/lib/model/output/management.model"

export async function recentOrders(): Promise<InvoiceListItem[]> {
    return await client.recentOrders()
}

export async function favoriteCuisines(): Promise<OrderCuisineSummary[]> {
    return await client.favoriteCuisines()
}

export async function weeklySpecials(): Promise<CuisineListItem[]> {
    return await client.weeklySpecials()
}
