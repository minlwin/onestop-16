package com.jdc.foods.api.shopper.master.input;

import jakarta.validation.constraints.NotBlank;

public record Ingredient(
		@NotBlank(message = "Please enter ingredient name.")
		String name,
		@NotBlank(message = "Please enter ingredient value.")
		String value) {

}
