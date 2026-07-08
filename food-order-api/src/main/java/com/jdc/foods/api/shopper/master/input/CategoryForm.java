package com.jdc.foods.api.shopper.master.input;

import com.jdc.foods.model.consts.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoryForm(
		@NotBlank(message = "Please enter category name.")
		String name,
		@NotNull(message = "Please select status.")
		Status status) {

}
