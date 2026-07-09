package com.jdc.foods.api.shopper.management;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.management.output.DashboardSummary;
import com.jdc.foods.api.shopper.management.output.OrderStatusCount;
import com.jdc.foods.api.shopper.management.output.RevenueTrendPoint;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("dashboardManagementApi")
@RequestMapping("shopper/management/dashboard")
public class DashboardApi {

	@GetMapping("summary")
	DashboardSummary summary() {
		return null;
	}

	@GetMapping("revenue-trend")
	List<RevenueTrendPoint> revenueTrend() {
		return List.of();
	}

	@GetMapping("orders-by-status")
	List<OrderStatusCount> ordersByStatus() {
		return List.of();
	}

}
