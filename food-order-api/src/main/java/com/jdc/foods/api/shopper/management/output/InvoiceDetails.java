package com.jdc.foods.api.shopper.management.output;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.jdc.foods.model.management.entity.Invoice;

public record InvoiceDetails(
		String id,
		String status,
		LocalDate invoiceDate,
		LocalDateTime statusChangedAt,
		List<InvoiceItem> items,
		CustomerInfo customer,
		DeliveryInfo delivery) {

	public static InvoiceDetails from(Invoice entity) {
		return new InvoiceDetails(
				entity.getId().getCode(),
				entity.getStatus().name(),
				entity.getId().issueAt(),
				InvoiceListItem.statusChangedAt(entity),
				entity.getItems().stream().map(InvoiceItem::from).toList(),
				CustomerInfo.from(entity),
				DeliveryInfo.from(entity));
	}

}
