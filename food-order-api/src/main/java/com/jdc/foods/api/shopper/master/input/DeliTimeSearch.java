package com.jdc.foods.api.shopper.master.input;

import com.jdc.foods.model.consts.Status;

public record DeliTimeSearch(
	Status status,
	String time
) {

}
