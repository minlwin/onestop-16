package com.jdc.foods.api.shopper.master.output;

import java.time.LocalTime;

import com.jdc.foods.model.master.entity.DeliveryTime;
import com.jdc.foods.utils.consts.Status;

public record DeliTimeDetails(
		int id,
		LocalTime timeFrom,
		LocalTime timeTo,
		Status status) {

	public static DeliTimeDetails from(DeliveryTime entity) {
		return new DeliTimeDetails(
				entity.getId(),
				LocalTime.parse(entity.getTimeFrom()),
				LocalTime.parse(entity.getTimeTo()),
				entity.getDeletedAt() == null ? Status.Enable : Status.Disable);
	}
}
