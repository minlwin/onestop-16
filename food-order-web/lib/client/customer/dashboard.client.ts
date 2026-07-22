import "server-only"

import { CuisineListItem } from "@/lib/model/output/master-data.model"
import { InvoiceListItem, OrderCuisineSummary } from "@/lib/model/output/management.model"
import { securedRequest } from ".."

const PATH = 'customer/dashboard'

export async function recentOrders(): Promise<InvoiceListItem[]> {
    return await securedRequest({path : `${PATH}/recent-orders`})
}

export async function favoriteCuisines(): Promise<OrderCuisineSummary[]> {
    return await securedRequest({path : `${PATH}/favorite-cuisines`})
}

export async function weeklySpecials(): Promise<CuisineListItem[]> {
    return await securedRequest({path : `${PATH}/weekly-specials`})
}
