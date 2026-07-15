package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;

public record InvoiceItem(
		String id,
		String cuisine,
		int quantity,
		BigDecimal price) {

	public static InvoiceItem from(com.jdc.foods.model.management.entity.InvoiceItem entity) {
		return new InvoiceItem(
				String.valueOf(entity.getCuisine().getId()),
				entity.getCuisine().getName(),
				entity.getQuantity(),
				entity.getUnitPrice());
	}

}
