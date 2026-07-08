package com.jdc.foods.api.shopper.account.output;

public record OrderStatusSummary(
		String status,
		long count,
		String amount) {

}
