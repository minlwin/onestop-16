package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDate;

public record EmployeeDetails(
		int id,
		String name,
		String phone,
		String email,
		LocalDate entryAt,
		LocalDate retireAt) {

}
