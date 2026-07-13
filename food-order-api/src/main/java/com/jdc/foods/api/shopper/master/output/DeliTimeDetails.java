package com.jdc.foods.api.shopper.master.output;

import java.time.LocalTime;

import com.jdc.foods.utils.consts.Status;

public record DeliTimeDetails(
		int id,
		LocalTime timeFrom,
		LocalTime timeTo,
		Status status) {

}
