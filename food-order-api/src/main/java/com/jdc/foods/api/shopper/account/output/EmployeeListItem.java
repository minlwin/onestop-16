package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDate;

import com.jdc.foods.model.account.entity.Employee;

public record EmployeeListItem(
		int id,
		String name,
		String phone,
		String email,
		LocalDate entryAt,
		LocalDate retireAt) {

	public String getStatus() {
		if(null != retireAt && LocalDate.now().isAfter(retireAt)) {
			return "Retired";
		}

		return "Active";
	}

	public static EmployeeListItem from(Employee entity) {
		return new EmployeeListItem(
				entity.getId(),
				entity.getName(),
				entity.getPhone(),
				entity.getAccount().getEmail(),
				entity.getEntryAt(),
				entity.getRetireAt());
	}
}
