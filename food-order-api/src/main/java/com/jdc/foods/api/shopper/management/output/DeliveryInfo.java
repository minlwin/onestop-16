package com.jdc.foods.api.shopper.management.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.jdc.foods.model.management.entity.Invoice;

public record DeliveryInfo(
		String label,
		String address,
		String township,
		BigDecimal fees,
		LocalDate dispatchDate,
		LocalTime timeFrom,
		LocalTime timeTo,
		String remark) {

	public static DeliveryInfo from(Invoice entity) {
		var address = entity.getAddress();
		var time = entity.getDeliveryTime();

		return new DeliveryInfo(
				address.getLabel(),
				address.getAddress(),
				address.getTownship(),
				address.getDeliveryFee() == null ? BigDecimal.ZERO : address.getDeliveryFee(),
				entity.getDeliveryDate(),
				LocalTime.parse(time.getTimeFrom()),
				LocalTime.parse(time.getTimeTo()),
				entity.getRemark());
	}

}
