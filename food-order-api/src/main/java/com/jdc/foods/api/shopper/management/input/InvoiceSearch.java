package com.jdc.foods.api.shopper.management.input;

import java.time.LocalDate;

public record InvoiceSearch(
	String status,
	LocalDate from,
	LocalDate to,
	String keyword
) {

}
