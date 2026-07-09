package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.jdc.foods.model.consts.Status;

public record DeliTimeListItem(
		int id,
		String name,
		LocalTime timeFrom,
		LocalTime timeTo,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

}
