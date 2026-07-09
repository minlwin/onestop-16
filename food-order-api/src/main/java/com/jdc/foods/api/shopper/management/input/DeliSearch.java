package com.jdc.foods.api.shopper.management.input;

import java.time.LocalDate;

public record DeliSearch(
	LocalDate from,
	LocalDate to,
	String keyword
) {

}
