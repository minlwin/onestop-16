package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDateTime;
import java.util.List;

import com.jdc.foods.model.account.entity.Customer;

public record CustomerDetails(
		int id,
		String name,
		String phone,
		String email,
		LocalDateTime registeredAt,
		List<DeliveryAddress> addresses,
		List<OrderStatusSummary> orderSummary) {

	public static CustomerDetails from(Customer entity, List<OrderStatusSummary> orderSummary) {
		return new CustomerDetails(
				entity.getId(),
				entity.getName(),
				entity.getPhone(),
				entity.getAccount().getEmail(),
				entity.getRegisteredAt(),
				entity.getAddress().stream().map(DeliveryAddress::from).toList(),
				orderSummary);
	}

}
