package com.jdc.foods.api.shopper.account.output;

import java.time.LocalDate;

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
}
