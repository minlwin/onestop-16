"use server"

import * as client from "@/lib/client/shopper/management/dashboard.client"
import {
    DashboardSummary,
    OrderStatusCount,
    RevenueTrendPoint,
} from "@/lib/model/output/dashboard.model"

export async function summary(): Promise<DashboardSummary> {
    return await client.summary()
}

export async function revenueTrend(): Promise<RevenueTrendPoint[]> {
    return await client.revenueTrend()
}

export async function ordersByStatus(): Promise<OrderStatusCount[]> {
    return await client.ordersByStatus()
}
