package com.jdc.foods.api.shopper.master.input;

import java.time.LocalTime;

import com.jdc.foods.model.consts.Status;

public record DeliTimeSearch(
	Status status,
	LocalTime time
) {

}
