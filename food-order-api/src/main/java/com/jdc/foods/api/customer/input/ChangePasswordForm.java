package com.jdc.foods.api.customer.input;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ChangePasswordForm(
		@NotBlank(message = "Please enter email address.")
		@Email(message = "Please enter email address.")
		String email,
		@NotBlank(message = "Please enter old password.")
		String oldPass,
		@NotBlank(message = "Please enter new password.")
		String newPass,
		@NotBlank(message = "Please enter confirm password.")
		String confPass) {

}
