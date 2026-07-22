import "server-only"

import {
    DashboardSummary,
    OrderStatusCount,
    RevenueTrendPoint,
} from "@/lib/model/output/dashboard.model"
import { securedRequest } from "../.."

const PATH = 'shopper/management/dashboard'

export async function summary(): Promise<DashboardSummary> {
    return await securedRequest({path: `${PATH}/summary`})
}

export async function revenueTrend(): Promise<RevenueTrendPoint[]> {
    return await securedRequest({path: `${PATH}/revenue-trend`})
}

export async function ordersByStatus(): Promise<OrderStatusCount[]> {
    return await securedRequest({path: `${PATH}/orders-by-status`})
}
