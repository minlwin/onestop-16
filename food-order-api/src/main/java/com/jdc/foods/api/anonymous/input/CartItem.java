package com.jdc.foods.api.anonymous.input;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CartItem(
		@NotNull(message = "Please select a cuisine.")
		Integer cuisineId,
		@NotBlank(message = "Please enter cuisine name.")
		String name,
		@NotNull(message = "Please enter price.")
		@Positive(message = "Please enter a valid price.")
		BigDecimal price,
		@NotNull(message = "Please enter quantity.")
		@Positive(message = "Please enter a valid quantity.")
		Integer quantity) {

}
