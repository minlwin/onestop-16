package com.jdc.foods.api.shopper.master.input;

import com.jdc.foods.utils.consts.Status;

public record CuisineSearch(
	Status status,
	String keyword
) {

}
