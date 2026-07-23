package com.jdc.foods.api.shopper.master.input;

import java.math.BigDecimal;
import java.util.List;

import com.jdc.foods.utils.consts.Status;
import com.jdc.foods.utils.dto.Ingredient;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CuisineForm(
		@NotBlank(message = "Please enter cuisine name.")
		String name,
		@NotBlank(message = "Please enter description.")
		String description,
		@NotNull(message = "Please select category.")
		Integer category,
		boolean isRegular,
		@NotBlank(message = "Please select spice level.")
		String spiceLevel,
		@NotNull(message = "Please enter price.")
		@Positive(message = "Please enter a valid price.")
		BigDecimal price,
		@NotNull(message = "Please select status.")
		Status status,
		@Valid
		List<Ingredient> ingredients) {

}
