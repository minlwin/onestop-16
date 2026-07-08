package com.jdc.foods.api.shopper.master.input;

import jakarta.validation.constraints.NotBlank;

public record UpdateCoverPhotoForm(
		@NotBlank(message = "Please select a photo.")
		String photo) {

}
