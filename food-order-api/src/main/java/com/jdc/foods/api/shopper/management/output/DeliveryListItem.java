package com.jdc.foods.api.shopper.management.output;

import java.time.LocalDate;

import com.jdc.foods.model.management.entity.Invoice;

public record DeliveryListItem(
		String invoiceId,
		String customer,
		LocalDate deliveryDate,
		String timeRange,
		String address) {

	public static DeliveryListItem from(Invoice entity) {
		var time = entity.getDeliveryTime();
		var address = entity.getAddress();

		return new DeliveryListItem(
				entity.getId().getCode(),
				entity.getName(),
				entity.getDilveryDate(),
				"%s - %s".formatted(time.getTimeFrom(), time.getTimeTo()),
				"%s, %s".formatted(address.getAddress(), address.getTownship()));
	}

}
