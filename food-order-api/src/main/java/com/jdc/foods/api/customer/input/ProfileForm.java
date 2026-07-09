package com.jdc.foods.api.customer.input;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ProfileForm(
		@NotBlank(message = "Please enter your name.")
		String name,
		@NotBlank(message = "Please enter your phone number.")
		String phone,
		@NotBlank(message = "Please enter your email address.")
		@Email(message = "Please enter your email address.")
		String email) {

}
