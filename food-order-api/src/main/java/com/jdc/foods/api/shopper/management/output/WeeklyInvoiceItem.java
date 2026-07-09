package com.jdc.foods.api.shopper.management.output;

import java.time.LocalDate;

public record WeeklyInvoiceItem(
		String id,
		String customer,
		LocalDate confirmDate,
		LocalDate deliveryDate) {

}
