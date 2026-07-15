package com.jdc.foods.api.customer;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.anonymous.service.CuisineService;
import com.jdc.foods.api.customer.service.CustomerDashboardService;
import com.jdc.foods.api.shopper.management.output.InvoiceListItem;
import com.jdc.foods.api.shopper.management.output.OrderCuisineSummary;
import com.jdc.foods.api.shopper.master.output.CuisineListItem;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("customer/dashboard")
public class CustomerDashBoardApi {
	
	private final CustomerDashboardService service;
	private final CuisineService cuisineService;

	@GetMapping("recent-orders")
	List<InvoiceListItem> recentOrders() {
		return service.findRecent();
	}

	@GetMapping("favorite-cuisines")
	List<OrderCuisineSummary> favoriteCuisines() {
		return service.getFavCuisines();
	}

	@GetMapping("weekly-specials")
	List<CuisineListItem> weeklySpecials() {
		return cuisineService.getWeeklySpecial();
	}

}
