package com.jdc.foods.api.shopper.account.input;

import com.jdc.foods.model.consts.EmployeeStatus;

public record EmployeeSearch(
	EmployeeStatus status,
	String keyword
) {

}
