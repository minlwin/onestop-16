package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;

public record InvoiceItem(
		String id,
		String cuisine,
		int quantity,
		BigDecimal price) {

}
