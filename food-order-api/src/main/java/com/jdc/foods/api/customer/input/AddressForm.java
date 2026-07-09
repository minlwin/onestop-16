package com.jdc.foods.api.customer.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddressForm(
		@NotBlank(message = "Please enter a label.")
		String label,
		@NotBlank(message = "Please enter your address.")
		String address,
		@NotBlank(message = "Please enter your township.")
		String township,
		@NotNull(message = "Please select default option.")
		Boolean isDefault) {

}
