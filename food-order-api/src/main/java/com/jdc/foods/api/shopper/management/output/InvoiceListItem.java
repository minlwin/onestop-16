package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.foods.model.management.entity.Invoice;

public record InvoiceListItem(
		String id,
		String customer,
		String phone,
		LocalDate invoiceDate,
		String status,
		LocalDateTime statusChangedAt,
		BigDecimal amount) {

	public static InvoiceListItem from(Invoice entity) {
		return new InvoiceListItem(
				entity.getId().getCode(),
				entity.getName(),
				entity.getAddress().getPhone(),
				entity.getId().issueAt(),
				entity.getStatus().name(),
				statusChangedAt(entity),
				amountOf(entity));
	}

	public static LocalDateTime statusChangedAt(Invoice entity) {
		if(null != entity.getFinishedAt()) {
			return entity.getFinishedAt();
		}

		if(null != entity.getConfirmedAt()) {
			return entity.getConfirmedAt();
		}

		return entity.getInvoicedAt();
	}

	public static BigDecimal amountOf(Invoice entity) {
		var subtotal = entity.getItems().stream()
				.map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
				.reduce(BigDecimal.ZERO, BigDecimal::add);

		var fees = entity.getAddress().getDeliveryFee();

		return subtotal.add(null == fees ? BigDecimal.ZERO : fees);
	}

}
