package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDateTime;
import java.util.List;

public record CustomerDetails(
		int id,
		String name,
		String phone,
		String email,
		LocalDateTime registeredAt,
		List<DeliveryAddress> addresses,
		List<OrderStatusSummary> orderSummary) {

}
