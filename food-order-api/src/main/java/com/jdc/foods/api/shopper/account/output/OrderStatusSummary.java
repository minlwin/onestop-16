package com.jdc.foods.api.shopper.account.output;

import static com.jdc.foods.utils.FormatUtils.formatCurrency;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import com.jdc.foods.api.shopper.management.output.InvoiceListItem;
import com.jdc.foods.model.management.entity.Invoice;

public record OrderStatusSummary(
		String status,
		long count,
		String amount) {

	public static List<OrderStatusSummary> summarize(List<Invoice> invoices) {
		return invoices.stream()
				.collect(Collectors.groupingBy(entity -> entity.getStatus().name()))
				.entrySet().stream()
				.map(entry -> new OrderStatusSummary(
						entry.getKey(),
						entry.getValue().size(),
						formatCurrency(entry.getValue().stream()
								.map(InvoiceListItem::amountOf)
								.reduce(BigDecimal.ZERO, BigDecimal::add))))
				.toList();
	}

}
