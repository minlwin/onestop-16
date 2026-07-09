package com.jdc.foods.api.shopper.management.output;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record InvoiceDetails(
		String id,
		String status,
		LocalDate invoiceDate,
		LocalDateTime statusChangedAt,
		List<InvoiceItem> items,
		CustomerInfo customer,
		DeliveryInfo delivery) {

}
