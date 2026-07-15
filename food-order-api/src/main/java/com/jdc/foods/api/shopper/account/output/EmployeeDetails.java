package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDate;

import com.jdc.foods.model.account.entity.Employee;

public record EmployeeDetails(
		int id,
		String name,
		String phone,
		String email,
		LocalDate entryAt,
		LocalDate retireAt) {

	public static EmployeeDetails from(Employee entity) {
		return new EmployeeDetails(
				entity.getId(),
				entity.getName(),
				entity.getPhone(),
				entity.getAccount().getEmail(),
				entity.getEntryAt(),
				entity.getRetireAt());
	}

}
