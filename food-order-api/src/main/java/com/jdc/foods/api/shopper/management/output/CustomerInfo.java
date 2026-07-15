package com.jdc.foods.api.shopper.management.output;

import com.jdc.foods.model.management.entity.Invoice;

public record CustomerInfo(
		String name,
		String phone,
		String email) {

	public static CustomerInfo from(Invoice entity) {
		return new CustomerInfo(
				entity.getName(),
				entity.getAddress().getPhone(),
				entity.getEmail());
	}

}
