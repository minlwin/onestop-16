package com.jdc.foods.utils.mails;

import java.time.LocalDate;

public record EmployeeCreatedEvent(
		String name, 
		String email, 
		String password,
		LocalDate entryAt) {
}
