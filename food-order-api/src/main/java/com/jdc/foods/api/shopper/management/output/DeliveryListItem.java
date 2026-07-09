package com.jdc.foods.api.shopper.management.output;

import java.time.LocalDate;

public record DeliveryListItem(
		String invoiceId,
		String customer,
		LocalDate deliveryDate,
		String timeRange,
		String address) {

}
