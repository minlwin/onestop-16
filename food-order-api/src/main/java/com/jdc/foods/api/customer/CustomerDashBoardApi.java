package com.jdc.foods.api.customer;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.management.output.InvoiceListItem;
import com.jdc.foods.api.shopper.management.output.OrderCuisineSummary;
import com.jdc.foods.api.shopper.master.output.CuisineListItem;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("customer/dashboard")
public class CustomerDashBoardApi {

	@GetMapping("recent-orders")
	List<InvoiceListItem> recentOrders() {
		return List.of();
	}

	@GetMapping("favorite-cuisines")
	List<OrderCuisineSummary> favoriteCuisines() {
		return List.of();
	}

	@GetMapping("weekly-specials")
	List<CuisineListItem> weeklySpecials() {
		return List.of();
	}

}
