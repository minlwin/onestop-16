package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;

public record DashboardSummary(
		BigDecimal todayRevenue,
		int todayOrders,
		int pendingInvoices,
		int totalCustomers) {

}
