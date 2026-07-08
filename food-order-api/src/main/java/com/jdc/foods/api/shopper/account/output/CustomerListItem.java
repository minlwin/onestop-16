package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDateTime;

public record CustomerListItem(
		int id,
		String name,
		String phone,
		String email,
		LocalDateTime registeredAt,
		long invoices) {

}
