package com.jdc.foods.api.shopper.master.output;

import java.time.LocalTime;

import com.jdc.foods.model.consts.Status;

public record DeliTimeDetails(
		int id,
		LocalTime timeFrom,
		LocalTime timeTo,
		Status status) {

}
