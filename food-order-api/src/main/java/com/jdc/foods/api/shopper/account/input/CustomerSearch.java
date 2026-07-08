package com.jdc.foods.api.shopper.account.input;

import java.time.LocalDate;

public record CustomerSearch(
	LocalDate from,
	LocalDate to,
	String keyword,
	Integer page,
	Integer size
) {

}
