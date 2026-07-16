package com.jdc.foods.api.anonymous.input;

import jakarta.validation.constraints.NotBlank;

public record TokenForm(
		@NotBlank(message = "Please enter refresh token.")
		String token) {

}
