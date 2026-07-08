package com.jdc.foods.api.shopper.master.input;

import com.jdc.foods.model.consts.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PaymentInfoForm(
		@NotBlank(message = "Please enter bank name.")
		String bank,
		@NotBlank(message = "Please enter account no.")
		String accountNo,
		@NotBlank(message = "Please enter account name.")
		String accountName,
		@NotNull(message = "Please select status.")
		Status status) {

}
