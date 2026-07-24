package com.jdc.foods.api.anonymous.input;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CheckoutForm(
		@NotBlank(message = "Please enter your name.")
		String name,
		@NotBlank(message = "Please enter your phone number.")
		String phone,
		@NotBlank(message = "Please enter your email address.")
		String email,
		@NotBlank(message = "Please enter your delivery address.")
		String address,
		@NotBlank(message = "Please enter your township.")
		String township,
		@NotNull(message = "Please select a delivery date.")
		LocalDate deliveryDate,
		@NotNull(message = "Please select a delivery time.")
		Integer deliveryTimeId,
		String remark,
		@NotEmpty(message = "Cart must not be empty.")
		List<@Valid CartItem> items) {

}
