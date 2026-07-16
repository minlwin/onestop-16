package com.jdc.foods.api.shopper.account.input;

import java.time.LocalDate;

import com.jdc.foods.model.account.entity.Employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeForm(
		@NotBlank(message = "Please enter employee name.")
		String name,
		@NotBlank(message = "Please enter phone number.")
		String phone,
		@NotBlank(message = "Please enter email address.")
		String email,
		@NotNull(message = "Please enter entry date.")
		LocalDate entryAt,
		LocalDate retireAt) {

	public void apply(Employee entity) {
		entity.setPhone(phone);
		entity.setEntryAt(entryAt);
		entity.setRetireAt(retireAt);
	}

}
