package com.jdc.foods.api.shopper.master.input;

import java.time.LocalTime;

import com.jdc.foods.model.consts.Status;

import jakarta.validation.constraints.NotNull;

public record DeliTimeForm(
		@NotNull(message = "Please enter start time.")
		LocalTime timeFrom,
		@NotNull(message = "Please enter end time.")
		LocalTime timeTo,
		@NotNull(message = "Please select status.")
		Status status) {

}
