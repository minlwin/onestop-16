import "server-only"

import {
    DashboardSummary,
    OrderStatusCount,
    RevenueTrendPoint,
} from "@/lib/model/output/dashboard.model"

export async function summary(): Promise<DashboardSummary> {
    return {
        todayRevenue: 690000,
        todayOrders: 32,
        pendingInvoices: 12,
        totalCustomers: 214,
    }
}

export async function revenueTrend(): Promise<RevenueTrendPoint[]> {
    return [
        { day: "Mon", revenue: 420000 },
        { day: "Tue", revenue: 380000 },
        { day: "Wed", revenue: 510000 },
        { day: "Thu", revenue: 460000 },
        { day: "Fri", revenue: 610000 },
        { day: "Sat", revenue: 720000 },
        { day: "Sun", revenue: 690000 },
    ]
}

export async function ordersByStatus(): Promise<OrderStatusCount[]> {
    return [
        { status: "Delivered", count: 58 },
        { status: "Confirmed", count: 24 },
        { status: "Invoiced", count: 12 },
        { status: "Canceled", count: 6 },
    ]
}
