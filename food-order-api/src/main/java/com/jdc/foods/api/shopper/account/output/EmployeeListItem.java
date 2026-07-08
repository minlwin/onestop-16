package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDate;

import com.jdc.foods.model.consts.EmployeeStatus;

public record EmployeeListItem(
		int id,
		String name,
		String phone,
		String email,
		LocalDate entryAt,
		LocalDate retireAt,
		EmployeeStatus status) {

}
