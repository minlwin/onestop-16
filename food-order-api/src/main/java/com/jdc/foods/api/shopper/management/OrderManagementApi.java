package com.jdc.foods.api.shopper.management;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.management.output.OrderCuisineSummary;
import com.jdc.foods.api.shopper.management.output.WeeklyInvoiceItem;
import com.jdc.foods.api.shopper.management.service.OrderManagementService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("orderManagementApi")
@RequestMapping("shopper/management/orders")
public class OrderManagementApi {
	
	private final OrderManagementService service;

	@GetMapping("weekly-invoices")
	List<WeeklyInvoiceItem> weeklyInvoices() {
		return service.search();
	}

	@GetMapping("cuisine-summary")
	List<OrderCuisineSummary> cuisineSummary() {
		return service.searchCuisine();
	}

}
