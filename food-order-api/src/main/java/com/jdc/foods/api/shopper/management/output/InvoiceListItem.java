package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record InvoiceListItem(
		String id,
		String customer,
		String phone,
		LocalDate invoiceDate,
		String status,
		LocalDateTime statusChangedAt,
		BigDecimal amount) {

}
