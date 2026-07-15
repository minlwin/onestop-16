package com.jdc.foods.api.anonymous.input;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CartItem(
		@NotNull(message = "Please select a cuisine.")
		Integer cuisineId,
		@NotNull(message = "Please enter quantity.")
		@Positive(message = "Please enter a valid quantity.")
		Integer quantity) {

}
