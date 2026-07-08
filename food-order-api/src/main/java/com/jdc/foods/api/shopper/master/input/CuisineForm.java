package com.jdc.foods.api.shopper.master.input;

import java.util.List;

import com.jdc.foods.model.consts.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.Valid;

public record CuisineForm(
		@NotBlank(message = "Please enter cuisine name.")
		String name,
		@NotBlank(message = "Please enter description.")
		String description,
		@NotBlank(message = "Please select category.")
		String category,
		boolean isRegular,
		@NotBlank(message = "Please select spice level.")
		String spiceLevel,
		@NotNull(message = "Please select status.")
		Status status,
		@Valid
		List<Ingredient> ingredients) {

}
