export type DashboardSummary = {
    todayRevenue: number
    todayOrders: number
    pendingInvoices: number
    totalCustomers: number
}

export type RevenueTrendPoint = {
    day: string
    revenue: number
}

export type OrderStatusCount = {
    status: string
    count: number
}
